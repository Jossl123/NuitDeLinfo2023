let conv = document.createElement("button")
conv.textContent="lea"
conv.addEventListener("click", (e) => {
    document.getElementById("discussion").style.left = "0"
    document.getElementById("conversations").style.left = "-100%"
})
document.getElementById("conversations").appendChild(conv)