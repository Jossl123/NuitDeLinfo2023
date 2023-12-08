<?php

// require_once __DIR__ . '/vendor/autoload.php';
// require_once __DIR__ . '/includes/config.php';
// require_once __DIR__ . '/includes/database.php';
// require_once __DIR__ . '/includes/functions.php';

// ... (Initialize configurations, database connection, etc.)

$uri = $_SERVER['REQUEST_URI'];

// Simple routing example
switch ($uri) {
    case '/':
        include 'phone.php';
        break;
    case '/restart':
        echo "yolo";
        include("check_session.php");
        $_SESSION = array();
        header('Location: /');
        break;
    // Handle other routes as needed
}