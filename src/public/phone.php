<!-- home.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="./css/phone/phone.css">
    <link rel="stylesheet" href="./css/phone/conversations.css">
    <link rel="stylesheet" href="./css/phone/discussion.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>
<body>
    <div id="phone_out">
        <div id="phone">
            <div id="phone-lock" class="panel">
                <h1 id="hour">00:00</h1>
            </div>
            <div id="conversations" class="panel">
            </div>
            <div id="discussion" class="panel">
                <button id="params">
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                <div id="messages">
                </div>
                <div id="type_zone">
                    <input type="text">
                    <button><span class="material-symbols-outlined">send</span></button>
                </div>
            </div>
        </div>
    </div>
    <div id="stat" > </div>
    <script src="./js/msgLogic.js"></script>
    <script src="./js/conversations.js"></script>
    <script src="./js/unlock.js"></script>
</body>
</html>