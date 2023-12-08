<?php
include("check_session.php");
header('Content-Type: application/json');

function sendMsgData($data, $id){
    setCurrentMsg($id);
    echo json_encode($data[$id]);
}

// Check if the 'id' parameter is set in the URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $previousMsg=getCurrentMsg();



    $raw = file_get_contents('./data.json');
    $data = json_decode($raw);
    
    if (is_null($data)) {
        echo json_encode('{"error": "ça marche pas :c"}');
        return;
    }
    if($id == $previousMsg)return sendMsgData($data, $id);
    if(isset($data[$previousMsg]->content->choices)){
        for ($i=0; $i < count($data[$previousMsg]->content->choices); $i++) { 
            if ($data[$previousMsg]->content->choices[$i]->next == $id){
                return sendMsgData($data, $id);
            }
        }
    }
    if(isset($data[$previousMsg]->content)){
        if ($data[$previousMsg]->content->next == $id){
            return sendMsgData($data, $id);
        }
    }


    echo json_encode(array('type' => "error", "content" => "can't access ".$id." from ".$previousMsg));
    return;
} else {
    // If 'id' parameter is not set, return an error
    echo json_encode(array('error' => 'Missing parameter: id'));
}
?>