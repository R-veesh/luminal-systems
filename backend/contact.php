<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'success' => false,
        'message' => 'This endpoint accepts POST requests only. Use the contact form to submit data.',
        'note' => 'POST with JSON body: { "name": "...", "email": "...", "subject": "...", "message": "..." }',
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

if (!$name || !$email || !$subject || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email']);
    exit;
}

// Database storage
$dbSuccess = false;
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare(
        "INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())"
    );
    $stmt->execute([$name, $email, $subject, $message]);
    $dbSuccess = true;
} catch (PDOException $e) {
    error_log("DB Error: " . $e->getMessage());
}

// Send email via Mailtrap (optional — only if PHPMailer is installed)
$mailSuccess = false;
$vendorAutoload = __DIR__ . '/vendor/autoload.php';
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

        $mail->setFrom($email, $name);
        $mail->addReplyTo($email, $name);
        $mail->addAddress('hello@luminalsystems.lk', 'Luminal Systems');

        $mail->isHTML(true);
        $mail->Subject = "Contact Form: $subject";
        $mail->Body    = "<p><strong>Name:</strong> $name</p>
                          <p><strong>Email:</strong> $email</p>
                          <p><strong>Subject:</strong> $subject</p>
                          <p><strong>Message:</strong></p>
                          <p>" . nl2br(htmlspecialchars($message)) . "</p>";

        $mail->send();
        $mailSuccess = true;
    } catch (Exception $e) {
        error_log("Mailer Error: " . $e->getMessage());
    }
} else {
    error_log("PHPMailer not installed. Run: cd backend && composer install");
}

echo json_encode([
    'success' => true,
    'message' => 'Message sent successfully',
    'db_stored' => $dbSuccess,
    'email_sent' => $mailSuccess,
]);
