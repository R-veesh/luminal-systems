CREATE DATABASE IF NOT EXISTS luminal_systems;
USE luminal_systems;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    is_replied TINYINT(1) DEFAULT 0,
    reply_message TEXT,
    replied_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add columns if table already exists (safe migration)
ALTER TABLE contacts
    ADD COLUMN IF NOT EXISTS is_read TINYINT(1) DEFAULT 0 AFTER message,
    ADD COLUMN IF NOT EXISTS is_replied TINYINT(1) DEFAULT 0 AFTER is_read,
    ADD COLUMN IF NOT EXISTS reply_message TEXT AFTER is_replied,
    ADD COLUMN IF NOT EXISTS replied_at DATETIME AFTER reply_message;
