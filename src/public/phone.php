<!-- home.php -->
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
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    
</head>
<body>
    <div id="phone_out">
        <div id="phone">
            <?php include("parameters.php"); ?>
            <?php include("conversations.php"); ?>
            <?php include("discussion.php"); ?>
        </div>
    </div>
    <script src="./js/msgLogic.js"></script>
    <script src="./js/phone.js"></script>
    <script src="./js/conversations.js"></script>
</body>
</html>