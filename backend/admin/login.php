<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Email');

require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'success' => false,
        'message' => 'This endpoint accepts POST with JSON body: { "email": "...", "uid": "..." }',
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');
$uid = trim($input['uid'] ?? '');

$admins = unserialize(ADMIN_EMAILS);

if (!$email || !$uid) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and UID required']);
    exit;
}

if (!in_array($email, $admins)) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$token = bin2hex(random_bytes(32));

echo json_encode([
    'success' => true,
    'token' => $token,
    'email' => $email,
]);
