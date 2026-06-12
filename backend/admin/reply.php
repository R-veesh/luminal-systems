<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Email');

require_once __DIR__ . '/../config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

// Check admin auth via header
$email = $_SERVER['HTTP_X_ADMIN_EMAIL'] ?? '';
$admins = unserialize(ADMIN_EMAILS);
if (!$email || !in_array($email, $admins)) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id = (int)($input['id'] ?? 0);
$replyMessage = trim($input['reply'] ?? '');

if (!$id || !$replyMessage) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID and reply are required']);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("SELECT * FROM contacts WHERE id = ?");
    $stmt->execute([$id]);
    $contact = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$contact) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Contact not found']);
        exit;
    }

    // Send reply email (optional, only if PHPMailer installed)
    $mailSent = false;
    $vendorAutoload = __DIR__ . '/../vendor/autoload.php';
    if (file_exists($vendorAutoload)) {
        try {
            require_once $vendorAutoload;

            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = MAILTRAP_HOST;
            $mail->SMTPAuth   = true;
            $mail->Username   = MAILTRAP_USERNAME;
            $mail->Password   = MAILTRAP_PASSWORD;
            $mail->Port       = MAILTRAP_PORT;

            $mail->setFrom('hello@luminalsystems.lk', 'Luminal Systems');
            $mail->addAddress($contact['email'], $contact['name']);
            $mail->addReplyTo('hello@luminalsystems.lk', 'Luminal Systems');

            $mail->isHTML(true);
            $mail->Subject = "Re: " . $contact['subject'];
            $mail->Body = "
                <p>Dear {$contact['name']},</p>
                <p>Thank you for reaching out to Luminal Systems.</p>
                <hr>
                <p><strong>Your message:</strong><br>{$contact['message']}</p>
                <hr>
                <p><strong>Our response:</strong></p>
                <p>" . nl2br(htmlspecialchars($replyMessage)) . "</p>
                <br>
                <p>Best regards,<br>Luminal Systems Team</p>
            ";

            $mail->send();
            $mailSent = true;
        } catch (Exception $e) {
            error_log("Mailer Error: " . $e->getMessage());
        }
    } else {
        error_log("PHPMailer not installed. Run: cd backend && composer install");
    }

    // Update contact record regardless
    $stmt = $pdo->prepare("UPDATE contacts SET is_replied = 1, reply_message = ?, replied_at = NOW() WHERE id = ?");
    $stmt->execute([$replyMessage, $id]);

    echo json_encode([
        'success' => true,
        'email_sent' => $mailSent,
        'message' => $mailSent ? 'Reply sent successfully' : 'Reply saved (email not sent)',
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error']);
    error_log("Admin Reply Error: " . $e->getMessage());
}
