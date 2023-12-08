<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="./css/phone/phone.css">
    <link rel="stylesheet" href="./css/phone/conversations.css">
    <link rel="stylesheet" href="./css/phone/parameters.css">
    <link rel="stylesheet" href="./css/phone/discussion.css">
    <?php if (isFirstConnection()) {?><link rel="stylesheet" href="./css/phone/lock.css"><?php } ?>
    <link rel="stylesheet" href="./css/themes/<?php echo getUserCurrentTheme() ?>.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    
</head>
<body>
    <style>.snowflake {
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #fff;
    border-radius: 50%;
    pointer-events: none;
}</style>
    <?php if(getUserCurrentTheme() == "snow"){?> 
    <div id="snow-container" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;"></div>
    <?php } ?>
    <div id="phone_out">
        <div id="phone">
            <?php if (isFirstConnection()) {include("lock.php");} ?>
            <?php include("parameters.php"); ?>
            <?php include("conversations.php"); ?>
            <?php include("discussion.php"); ?>
        </div>
    </div>
    <script>
    var currentMsg = <?php echo getCurrentMsg(); 
    ?>
    </script>
    <script src="./js/msgLogic.js"></script>
    <script src="./js/phone.js"></script>
    <script src="./js/konami.js"></script>
    <?php if (isFirstConnection()) {?><script src="./js/unlock.js"></script><?php } ?>
</body>
</html>