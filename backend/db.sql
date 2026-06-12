CREATE DATABASE IF NOT EXISTS luminal_systems;
USE luminal_systems;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    user_uid VARCHAR(128) DEFAULT NULL,
    is_read TINYINT(1) DEFAULT 0,
    is_replied TINYINT(1) DEFAULT 0,
    reply_message TEXT,
    replied_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
