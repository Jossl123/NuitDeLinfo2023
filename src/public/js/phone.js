
function seeElem(id){
    document.getElementById(id).style.left = "0"
    document.getElementById(id).style.top = "0"
}

function toConversations(){
    document.getElementById("discussion").style.left = "100%"
    document.getElementById("discussion").style.top = "0"
    document.getElementById("parameters").style.left = "0"
    document.getElementById("parameters").style.top = "-100%"
    seeElem("conversations")
}

function toDiscussion(){
    document.getElementById("conversations").style.left = "-100%"
    document.getElementById("conversations").style.top = "0"
    document.getElementById("parameters").style.left = "0"
    document.getElementById("parameters").style.top = "-100%"
    seeElem("discussion")
}

function toParams(){
    document.getElementById("conversations").style.left = "0"
    document.getElementById("conversations").style.top = "100%"
    document.getElementById("discussion").style.left = "100%"
    document.getElementById("discussion").style.top = "-100%"
    seeElem("parameters")
}

const rectangle = document.getElementById('phone_out');

document.addEventListener('mousemove', (e) => {
    const xAxis = -(window.innerWidth / 2 - e.pageX) / 70;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 70;

    rectangle.style.transform = `perspective(500px) rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
});

// Reset the transform on mouse leave
document.addEventListener('mouseleave', () => {
    rectangle.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
});

const snowContainer = document.getElementById('snow-container');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.top = Math.random() * 100 + 'vw';
    snowContainer.appendChild(snowflake);

    snowflake.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(100vh)', opacity: 0 }
    ], {
        duration: Math.random() * 5000 + 5000, // Vary animation duration
        iterations: Infinity
    });

    // Remove snowflake after animation completes
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        createSnowflake(); // Create a new snowflake to replace the removed one
    });
}

// Create initial snowflakes
for (let i = 0; i < 500; i++) {
    createSnowflake();
}