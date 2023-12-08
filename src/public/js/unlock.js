function updateHour(){
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    document.getElementById('hour').innerHTML = `${hour}:${minute}`;
}
const idHour = setInterval(updateHour, 10000);
updateHour();

const phoneLock = document.getElementById('phone-lock');
const phoneUnlock = document.getElementById('phone');
let isDragging = false;
const phoneStartY = phoneLock.clientHeight;
let startY;
let unlockThreshold = phoneLock.clientHeight /2;

phoneLock.addEventListener('mousedown', function(e){
    isDragging = true;
    startY = e.clientY;
});

phoneLock.addEventListener('mousemove', function(e){
    if(isDragging){
        const deltaY = e.clientY - startY;
        const diffdist = phoneLock.getBoundingClientRect().top - phoneUnlock.getBoundingClientRect().top;
        phoneLock.style.transform = `translateY(${Math.min(deltaY,0)}px )`;
        if(-diffdist > unlockThreshold){
            phoneLock.style.display = 'none';
            clearInterval(idHour);
            const stat = document.getElementById('stat');
            stat.classList.toggle("enlarged")
        }
    }
});

phoneLock.addEventListener('mouseup', function(e){
    isDragging = false;
    phoneLock.style.transform = ``;
});