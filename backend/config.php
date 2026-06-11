<?php

define('MAILTRAP_HOST', getenv('MAILTRAP_HOST') ?: 'sandbox.smtp.mailtrap.io');
define('MAILTRAP_PORT', getenv('MAILTRAP_PORT') ?: 2525);
define('MAILTRAP_USERNAME', getenv('MAILTRAP_USERNAME') ?: 'your_username');
define('MAILTRAP_PASSWORD', getenv('MAILTRAP_PASSWORD') ?: 'your_password');

define('DB_HOST', 'localhost');
define('DB_NAME', 'luminal_systems');
define('DB_USER', 'root');
define('DB_PASS', '');
