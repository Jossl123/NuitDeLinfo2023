var messagesDiv = document.getElementById("messages");

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

scrollToBottom();

function sendMsg(msg, byYou){
    var newMessage = document.createElement('div');
    newMessage.classList.add('message');
    if(byYou)newMessage.classList.add('you');
    newMessage.textContent = msg;
    messagesDiv.appendChild(newMessage);
    scrollToBottom();
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removePreviewsMsg(){
    removeElementsByClass("preview")
}

function msgChoosed(msg){
    removePreviewsMsg()
    sendMsg(msg)
}

function choiceMsgConstructor(msg){
    var newMessage = document.createElement('button');
    newMessage.addEventListener("click", (e) => {
        msgChoosed(msg)
    })
    newMessage.classList.add('message', 'you', 'preview');
    newMessage.textContent = msg;
    return newMessage
}

function addPreviewChoices(choices){
    choices.forEach(choice => {
        console.log(choice)
        messagesDiv.appendChild(choiceMsgConstructor(choice))
    });
    scrollToBottom();
}

var story = [
    {
        "type": "message",
        "content": {
            "msg": "kjkldsjfmqfjdskmfqjlmsfj",
            "next": 3
        }
    },
    {
        "type": "choice",
        "content": {
            "choices" : [
                {
                    "msg": "choix 1",
                    "next": 0
                },
                {
                    "msg": "choix 2",
                    "next": 2
                }
            ],
        }
    },
    {
        "type": "ending",
        "content": {
            "ending_name": "FEU"
        }
    },
    {
        "type": "message",
        "content": {
            "msg": "kjkldsjfmqfjdskmfqjlmsfj",
            "image": "caca",
            "next": 1
        }
    },
]

var currentMsg = 0

function computeMsgData(msgData){
    switch (msgData.type) {
        case "message":
            sendMsg(msgData.content.msg)
            if (msgData.content.hasAttribute("image")){/*TODO*/}
            break;
    
        case "choice":
            addPreviewChoices(msgData.content.choices)
            break;

        case "ending":
            break;
            
        default:
            break;
    }
}