<?php

define('MAILTRAP_HOST', getenv('MAILTRAP_HOST') ?: 'sandbox.smtp.mailtrap.io');
define('MAILTRAP_PORT', getenv('MAILTRAP_PORT') ?: 2525);
define('MAILTRAP_USERNAME', getenv('MAILTRAP_USERNAME') ?: 'f329c0763f25ab');
define('MAILTRAP_PASSWORD', getenv('MAILTRAP_PASSWORD') ?: 'e878d2b8fcec3a');

define('DB_HOST', 'localhost');
define('DB_NAME', 'luminal_systems');
define('DB_USER', 'root');
define('DB_PASS', '');

// Admin email addresses allowed to access the admin panel
define('ADMIN_EMAILS', serialize(['admin@luminalsystems.lk']));

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');
