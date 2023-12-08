<?php 
session_start();
if (isset($_SESSION["user"])){
}else{
    $userData = array("currentMsg" => 0, "themes" => array(0));
    $_SESSION["user"] = json_encode($userData);
}
function getCurrentMsg(){
    return json_decode($_SESSION["user"], true)["currentMsg"];
}
function setCurrentMsg($id){
    $s = json_decode($_SESSION["user"], true);
    $s["currentMsg"] = $id;
    $_SESSION["user"] = json_encode($s);
}
?>