
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