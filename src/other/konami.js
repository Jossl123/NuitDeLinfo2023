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
        window.location.href = "Konami.html";
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0; 
    }
  }

  document.addEventListener("keydown", handleKeyDown);
}

detectKonamiCode();
