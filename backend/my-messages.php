<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);
$userUid = trim($input['user_uid'] ?? '');

if (!$userUid) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'User UID is required']);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare(
        "SELECT id, name, email, subject, message, is_read, is_replied, reply_message, replied_at, created_at 
         FROM contacts 
         WHERE user_uid = ? 
         ORDER BY created_at DESC"
    );
    $stmt->execute([$userUid]);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $messages, 'total' => count($messages)]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error']);
    error_log("My Messages Error: " . $e->getMessage());
}
