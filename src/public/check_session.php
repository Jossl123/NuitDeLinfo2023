<?php 
session_start();
$raw = file_get_contents('./data.json');
$data = json_decode($raw);
$themes =["default", "love", "hell", "konami", "snow"];
if (!isset($_SESSION["user"])){
    $userData = array("currentMsg" => 0, "previousMsg" => array(), "themes" => array("default"), "currentTheme" => "default", "firstConnection" => true);
    $_SESSION["user"] = json_encode($userData);
}else{
    $s = json_decode($_SESSION["user"], true);
    $s["firstConnection"]=false;
    $_SESSION["user"] = json_encode($s);
}
function getUserCurrentTheme(){
    return json_decode($_SESSION["user"], true)["currentTheme"];
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
function setUserCurrentTheme($theme){
    $s = json_decode($_SESSION["user"], true);
    $s["currentTheme"] = $theme;
    $_SESSION["user"] = json_encode($s);
}
function findEnding($endingName){
    $s = json_decode($_SESSION["user"], true);
    $s["previousMsg"] = array();
    $s["currentMsg"] = 0;
    if (!(in_array($endingName, $s["themes"]))) array_push($s["themes"], $endingName);
    $_SESSION["user"] = json_encode($s);
}
function isFirstConnection(){
    return json_decode($_SESSION["user"], true)["firstConnection"];
}
?>