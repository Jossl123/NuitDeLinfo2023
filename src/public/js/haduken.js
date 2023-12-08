const body = document.querySelector('body');
const duster = document.querySelector('#duster');
const ryu = document.querySelector('#ryu');
const hadouken = document.querySelector('#hadouken');

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
  //ajouter à la fin
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
  if (i%2 == 0){
    img.src = "./img/imagesKonami/arbre2.png"
  }
  img.classList.add('arbres')

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