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
        setCookie("kokonamimino", "yaaa", 1)
        window.location.href = "/konami";
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0; 
    }
  }

  document.addEventListener("keydown", handleKeyDown);
}

detectKonamiCode();
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}