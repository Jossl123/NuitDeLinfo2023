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
    console.log('boum')
    vibre = true
    shakeScreen()
    setTimeout(shakeScreen, 1500)
    setTimeout(StartForet, 1500)
    //setInterval(shakeScreen, 1000)
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
  hadouken.src = 'images/hadouken2.png'
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
  duster.src = "images/boum2.png"
  stopDuster = true
  duster.style.width = '20%'
  //duster.style.top = (duster.style.top -100)+'px'
  //duster.style.left= (duster.style.left -300)+'px'
  duster.style.top = '25%'
  duster.style.left = '45%'
}

function shakeScreen() {
  console.log('shake')
  document.body.classList.toggle('shake');
}

function StartForet(){
  hadouken.style.opacity = 0;
  setTimeout(()=>hadouken.style.display = 'none', 1000)
  duster.style.opacity = 0;

  //setTimeout(()=>duster.style.display = 'none', 1000)

  ryu.style.transition = 'opacity 1s ease';
  ryu.style.opacity = 0;
  setTimeout(()=>ryu.style.display = 'none', 1000)
  setTimeout(()=>duster.style.opacity = 1, 1000)
  setTimeout(()=>duster.src = "images/arbreColor.png", 1000)
}
