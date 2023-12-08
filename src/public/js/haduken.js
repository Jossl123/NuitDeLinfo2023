const body = document.querySelector('body');
const duster = document.querySelector('#duster');
const ryu = document.querySelector('#ryu');
const hadouken = document.querySelector('#hadouken');
var audio = document.querySelector('#audio')
audio.style.display = 'none'

var isAnimating = false;
var startTime;
var computedStyle = getComputedStyle(duster);
var leftDuster = parseInt(computedStyle.left); 
var topDuster = parseInt(computedStyle.top); 

var startRyu = false
var stopDuster = false
var startHaoudken = false

var computedStyle2 = getComputedStyle(ryu);
var leftRyu = parseInt(computedStyle2.left); 
var topRyu = parseInt(computedStyle2.top); 

var vibre = false

var opacityP = 1
k = 0
function animate() {
  explosion()
  if (leftRyu > 0){
    startRyu = false;
  }
  const currentTime = Date.now();
  const deltaTime = currentTime - startTime;

  if (!stopDuster){
    leftDuster -= 0.1 + deltaTime/1.5 * 0.01;
    duster.style.left = leftDuster + 'px';
  
    topDuster += 0.1 + deltaTime/1.5 * 0.004;
    duster.style.top = topDuster + 'px';

    k++
    var valeur = 2
    if (k <= 50){
      valeur = 5
      opacityP = 0.5
    }
    if (k %valeur == 0){
      createParticules();
    }

    requestAnimationFrame(animate);
  }else if (stopDuster && !vibre) {
    vibre = true
    shakeScreen()
    setTimeout(shakeScreen, 1500)
    setTimeout(StartForet, 1500)
}


  if (startRyu){
    leftRyu += 0.1 + deltaTime/1.5 * 0.01;
    ryu.style.left = leftRyu + 'px';
    ryu.style.transform = 'rotate(360deg)';
    setTimeout(displayHadouken, 1000)
  }

  if (leftDuster < window.innerWidth/2 + 600){
    ryu.style.display = 'block';
    startRyu = true;
  }
}

function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
    startTime = Date.now();
    animate();
  }
}
window.addEventListener('load', startAnimation);

function displayHadouken(){
  hadouken.style.display = 'block'
  hadouken.style.opacity = 1;
  setTimeout(changeHadouken, 200)
}

function changeHadouken(){
  audio.play()
  hadouken.src = './img/imagesKonami/hadouken2.png'
  hadouken.id = 'hadouken2'
  startHaoudken = true
}

function explosion(){
  if (duster.getBoundingClientRect().top +duster.getBoundingClientRect().width >= hadouken.getBoundingClientRect().top && startHaoudken){
    setTimeout(changeBoum, 100)
  }else{
    stopDuster = false
  }
}

function changeBoum(){
  duster.src = "./img/imagesKonami/boum2.png"
  stopDuster = true
  duster.style.width = '20%'
  duster.style.top = '25%'
  duster.style.left = '45%'
}

function shakeScreen() {
  document.body.classList.toggle('shake');
}

function StartForet(){
  hadouken.style.opacity = 0;
  setTimeout(()=>hadouken.style.display = 'none', 1000)
  duster.style.opacity = 0;
  ryu.style.transition = 'opacity 1s ease';
  ryu.style.opacity = 0;
  setTimeout(()=>displayForet(), 1000)

}

function displayForet(){
  body.style.backgroundColor = "lightgreen"
  ryu.style.display = 'none'
  duster.style.opacity = 1;
  duster.src = "./img/imagesKonami/arbreColor.png"
  i=0

  setTimeout(()=>  setInterval(() => {
    if (i < 60){
      createArbre(i)
      i++;
    }

  }, 250-i*2), 1000)
  var img = document.createElement('img');
  img.src = "./img/imagesKonami/Hmfwqnj.png"
  img.id = "Hmfwqnj"
  body.appendChild(img);
}

listArbresLeft = []
listArbresTop = []
function createArbre(i){
  var img = document.createElement('img');
  img.src = "./img/imagesKonami/arbre.png"
  img.classList.add('arbres')
  setTimeout(()=>img.style.opacity = 1, 100)
  if (i%2 == 0){
    img.src = "./img/imagesKonami/arbre2.png"
  }
  var isOverlapping = true;
  var maxAttempts = 10;
  var attempt = 0;

  while (isOverlapping && attempt < maxAttempts) {
    Theleft = Math.random() * (window.innerWidth-50);
    Thetop = Math.random() * (window.innerHeight -50);

    isOverlapping = checkOverlap(Theleft, Thetop);
    attempt++;
  }

  if (!isOverlapping) {
    listArbresLeft.push(Theleft);
    listArbresTop.push(Thetop);

    img.style.left = Theleft + 'px';
    img.style.top = Thetop + 'px';
    var computedStyle = getComputedStyle(img);
    var zindex = parseInt(computedStyle.zIndex) || 0; 
    img.style.zIndex = parseInt(zindex + Thetop);
    body.appendChild(img);
  }
}

function checkOverlap(left, top) {
  for (var i = 0; i < listArbresLeft.length; i++) {
    var existingLeft = listArbresLeft[i];
    var existingTop = listArbresTop[i];

    var horizontalDistance = Math.abs(left - existingLeft);
    var verticalDistance = Math.abs(top - existingTop);

    if (horizontalDistance < 50 && verticalDistance < 50) {
      return true; // Overlapping
    }
  }

  return false; // Not overlapping
}

function createParticules(){
  var img = document.createElement('img');
  img.src = "./img/imagesKonami/p.png"
  img.style.left = (leftDuster+140) + 'px';
  img.style.top = (topDuster+parseInt(computedStyle.height)/2)-70 + 'px'; 
  img.style.width = '10%'
  img.style.position = 'absolute'
  img.style.transform = 'rotate(-10deg)';
  img.style.opacity = opacityP
  img.style.filter = 'brightness(100%)'
  img.style.zIndex = "-1"
  body.appendChild(img);
  setInterval(() => {
    img.style.left = (parseInt(img.style.left)-1) + 'px';
    img.style.top = (parseInt(img.style.top)+1) + 'px'; 
    img.style.opacity -= 0.01
  }, 10);
  setTimeout(()=>document.body.removeChild(img), 1000)
}

