<?php
$requestUri = $_SERVER['REQUEST_URI'];
$uriComponents = parse_url($requestUri);
$path = $uriComponents['path'];

// Simple routing example
include("check_session.php");
switch ($path) {
    case '/':
        include 'phone.php';
        break;
    case '/restart':
        $_SESSION = array();
        header('Location: /');
        break;
    case '/changeTheme':
        if (isset($_GET['theme'])) {
            $userThemes = getUserThemes();
            if (in_array($_GET['theme'], $userThemes)){
                setUserCurrentTheme($_GET['theme']);
            }
        }
        header('Location: /');
        break;
    case '/rythm':
        include 'rythm.php';
        break;
    case '/konami':
        if (isset($_COOKIE["kokonamimino"]) && $_COOKIE["kokonamimino"] == "yaaa"){
            unset($_COOKIE["kokonamimino"]);
            setcookie("kokonamimino", "", time()-3600);
            findEnding("konami");
            include 'konami.html';
            break;
        }
        header('Location: /');
        break;
    // Handle other routes as needed
}