<?php

require_once __DIR__ . '/config.php';

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $added = 0;

    // Check and add each column independently
    $checks = [
        'user_uid' => "ADD COLUMN user_uid VARCHAR(128) DEFAULT NULL AFTER message",
        'is_read' => "ADD COLUMN is_read TINYINT(1) DEFAULT 0 AFTER user_uid",
        'is_replied' => "ADD COLUMN is_replied TINYINT(1) DEFAULT 0 AFTER is_read",
        'reply_message' => "ADD COLUMN reply_message TEXT AFTER is_replied",
        'replied_at' => "ADD COLUMN replied_at DATETIME AFTER reply_message",
    ];

    foreach ($checks as $col => $sql) {
        $stmt = $pdo->query("SHOW COLUMNS FROM contacts LIKE '$col'");
        if (!$stmt->fetch()) {
            $pdo->exec("ALTER TABLE contacts $sql");
            echo "Added column: $col\n";
            $added++;
        }
    }

    if ($added === 0) {
        echo "All columns already exist.\n";
    } else {
        echo "Migration complete. Added $added column(s).\n";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
