<?php 
session_start();
$raw = file_get_contents('./data.json');
$data = json_decode($raw);
if (isset($_SESSION["user"])){
}else{
    $userData = array("currentMsg" => 0, "previousMsg" => array(), "themes" => array("default"));
    $_SESSION["user"] = json_encode($userData);
}
function addPreviousMsg($id){
    $s = json_decode($_SESSION["user"], true);
    array_push($s["previousMsg"], $id);
    $_SESSION["user"] = json_encode($s);
}
function getPreviousMsg(){
    return json_decode($_SESSION["user"], true)["previousMsg"];
}
function getCurrentMsg(){
    return json_decode($_SESSION["user"], true)["currentMsg"];
}
function setCurrentMsg($id){
    $s = json_decode($_SESSION["user"], true);
    $s["currentMsg"] = $id;
    $_SESSION["user"] = json_encode($s);
}
function getUserThemes(){
    return json_decode($_SESSION["user"], true)["themes"];
}
function findEnding($endingName){
    $s = json_decode($_SESSION["user"], true);
    if (!(in_array($endingName, $s["themes"]))) array_push($s["themes"], $endingName);
    $_SESSION["user"] = json_encode($s);
}
?>