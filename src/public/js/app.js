const pieces = new Map()
let isKeyDown = [0, 0, 0, 0]
let combo = 0
let score = 0
let life = 5
let speed = 10
let space = 30
let song
let songData
let startTime
let spawnTime = 0
const offset = 1500

function drawKeys() {
    fill(255,0,0)
    circle(windowWidth/4, windowHeight-150, 60)
    fill(0,255,0)
    circle(windowWidth/6 + windowWidth/4, windowHeight-150, 60)
    fill(0,0,255)
    circle(2*windowWidth/6 + windowWidth/4, windowHeight-150, 60)
    fill(255,255,0)
    circle(3*windowWidth/6 + windowWidth/4, windowHeight-150, 60)
}

function keyDown(keyCode, index) {
    if (keyIsDown(keyCode)) {
        fillKey(keyCode, index)
        if (isKeyDown[index] == 0) {
            let hit = false
            for (piece of pieces.keys()) {
                if (dist(piece.x, piece.y, index*windowWidth/6 + windowWidth/4, windowHeight-150) < 40) {
                    pieces.delete(piece)
                    combo++
                    score += combo*10
                    hit = true
                }
            }
            if (!hit) {
                combo = 0
            }
        }
        circle(index*windowWidth/6 +windowWidth/4, windowHeight-150, 80)
        isKeyDown[index]++
    } else {
        isKeyDown[index] = 0
    }
}

function fillKey(keyCode, index) {
    switch (keyCode) {
        case 68:
            fill(255, 150 - isKeyDown[index]*5, 150 - isKeyDown[index]*5)
            break
        case 70:
            fill(150 - isKeyDown[index]*5, 255, 150 - isKeyDown[index]*5)
            break
        case 74:
            fill(150 - isKeyDown[index]*5, 150 - isKeyDown[index]*5, 255)
            break
        case 75:
            fill(255, 255, 150 - isKeyDown[index]*5)
            break
    }
}

function drawPieces() {
    for (piece of pieces.keys()) {
        switch (piece.x) {
            case windowWidth/4:
                fill(200,50,50)
                break
            case windowWidth/6 + windowWidth/4:
                fill(50,200,50)
                break
            case 2*windowWidth/6 + windowWidth/4:
                fill(50,50,200)
                break
            case 3*windowWidth/6 + windowWidth/4:
                fill(200,200,50)
                break
        }

        piece.y += speed
        circle(piece.x, piece.y, 50)
        if (!pieces.get(piece) && piece.y > windowHeight - 50) {
            life--
            combo = 0
            pieces.set(piece, true)
        }
        else if (piece.y > windowHeight + 100) {
            pieces.delete(piece)
        }
    }
}

function drawScore() {
    textSize(32)
    textAlign(CENTER)
    fill(255)
    text("Score: " + score, windowWidth/2, 50)
}

function drawCombo() {
    textSize(32)
    textAlign(CENTER)
    fill(255)
    text("Combo: " + combo, windowWidth/2, 100)
}

function drawLife() {
    textSize(32)
    textAlign(CENTER)
    fill(255)
    text("Life: " + life, windowWidth/2, 150)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function handleClick() {
    keyDown(68, 0)
    keyDown(70, 1)
    keyDown(74, 2)
    keyDown(75, 3)
}

async function loadSong() {
    let url = "song.json"
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return {"type": "error"};
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}  

function preload() {
    song = loadSound('./music/music.mp3')
}
async function getSong(){
    const response = await loadSong()
    return response
}
async function setup() {
    stroke(200)
    strokeWeight(0)
    frameRate(60)
    createCanvas(windowWidth, windowHeight)
    songData = await loadSong()
    song.play()
    startTime = millis()
}

function draw() {
    if (!songData.times.length == 0) {
        if (millis() - startTime + offset > songData.times[0].value) {
            let piece = {
                x: getRandomInt(4)*windowWidth/6 + windowWidth/4,
                y: -100
            }
            pieces.set(piece, false)
            songData.times.shift()
            spawnTime = millis()
        }
    }
    else {
        if (millis() - spawnTime > 5000) {
            song.stop()
            noLoop()
            textSize(50)
            textAlign(CENTER)
            fill(255)
            text("YOU WIN", windowWidth/2, windowHeight/2)
            text("Score: " + score, windowWidth/2, windowHeight/2 + 100)
            return
        }
    }
    if (life <= 0) {
        song.stop()
        noLoop()
        textSize(50)
        textAlign(CENTER)
        fill(255)
        text("GAME OVER", windowWidth/2, windowHeight/2)
        text("Score: " + score, windowWidth/2, windowHeight/2 + 100)
        return
    }
    background(0)
    drawKeys()
    handleClick()
    drawPieces()
    drawScore()
    drawCombo()
    drawLife()
}