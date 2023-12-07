
function detectKonamiCode() {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
  ];
  let konamiIndex = 0;

  function handleKeyDown(event) {
    if (event.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Konami code detected, do something here
        console.log("Konami code detected!");
        konamiIndex = 0; // Reset index for next detection
      }
    } else {
      konamiIndex = 0; // Reset index if wrong key is pressed
    }
  }

  document.addEventListener("keydown", handleKeyDown);
}

detectKonamiCode();
