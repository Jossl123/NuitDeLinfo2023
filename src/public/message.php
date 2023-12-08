<?php
include("check_session.php");
header('Content-Type: application/json');

// Check if the 'id' parameter is set in the URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $previousMsg=getCurrentMsg();

    $raw = file_get_contents('./data.json');
    $data = json_decode($raw);
    
    if (is_null($data)) {
        echo '{"error": "ça marche pas :c"}';
        return;
    }
    // if(isset($data[$previousMsg]) && isset($data[$previousMsg]["content"]["choices"])){};

    setCurrentMsg($id);
    echo json_encode($data[$id]);
} else {
    // If 'id' parameter is not set, return an error
    echo json_encode(array('error' => 'Missing parameter: id'));
}
?>