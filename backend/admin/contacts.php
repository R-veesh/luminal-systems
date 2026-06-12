<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Email');

require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$email = $_SERVER['HTTP_X_ADMIN_EMAIL'] ?? '';

$admins = unserialize(ADMIN_EMAILS);
if (!$email || !in_array($email, $admins)) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized - send X-Admin-Email header']);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = (int)($input['id'] ?? 0);
        $field = $input['field'] ?? '';
        $value = (int)($input['value'] ?? 0);

        if (!in_array($field, ['is_read', 'is_replied'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid field']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE contacts SET $field = ? WHERE id = ?");
        $stmt->execute([$value, $id]);

        echo json_encode(['success' => true]);
        exit;
    }

    // GET — list contacts with optional filters
    $page = max(1, (int)($_GET['page'] ?? 1));
    $limit = min(50, max(1, (int)($_GET['limit'] ?? 20)));
    $offset = ($page - 1) * $limit;
    $search = $_GET['search'] ?? '';
    $status = $_GET['status'] ?? '';

    $where = [];
    $params = [];

    if ($search) {
        $where[] = "(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)";
        $s = "%$search%";
        $params = array_merge($params, [$s, $s, $s, $s]);
    }

    if ($status === 'unread') {
        $where[] = "is_read = 0";
    } elseif ($status === 'read') {
        $where[] = "is_read = 1";
    } elseif ($status === 'replied') {
        $where[] = "is_replied = 1";
    } elseif ($status === 'unreplied') {
        $where[] = "is_replied = 0";
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    // Count total
    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM contacts $whereClause");
    $countStmt->execute($params);
    $total = (int)$countStmt->fetchColumn();

    // Fetch page
    $stmt = $pdo->prepare("SELECT * FROM contacts $whereClause ORDER BY created_at DESC LIMIT ? OFFSET ?");
    $allParams = [...$params, $limit, $offset];
    $stmt->execute($allParams);
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $contacts,
        'total' => $total,
        'page' => $page,
        'pages' => ceil($total / $limit),
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error']);
    error_log("Admin Contacts Error: " . $e->getMessage());
}
