

var story = [
    {
        "type": "message",
        "content": {
            "msg": "Hi",
            "next": 3
        }
    },
    {
        "type": "choice",
        "content": {
            "choices" : [
                {
                    "msg": "Fine",
                    "next": 4
                },
                {
                    "msg": "notFine",
                    "next": 5
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
            "msg": "How are u ? ",
            "image": "caca",
            "next": 1
        }
    },
    {
        "type": "message",
        "content": {
            "msg": "Cool ",
            "next": 6
        }
    },
    {
        "type": "message",
        "content": {
            "msg": "Not cool why ?  ",
            "next": 7
        }
    },
    {
        "type": "choice",
        "content": {
            "choices" : [
                {
                    "msg": "Yup",
                    "next": 2
                },
                {
                    "msg": "notFine",
                    "next": 2
                }
            ],
        }
    },
    {
        "type": "choice",
        "content": {
            "choices" : [
                {
                    "msg": "Because",
                    "next": 0
                },
                {
                    "msg": "IDK",
                    "next": 0
                }
            ],
        }
    },
]

var currentMsg = 0
var messagesDiv = document.getElementById("messages");

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

scrollToBottom();

function sendMsg(msg, byYou = false){
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

function msgChoosed(choosenId){
    removePreviewsMsg()
    let choice = story[currentMsg].content.choices[choosenId]
    sendMsg(choice.msg, true)
    currentMsg = choice.next
    computeMsgData(story[currentMsg])
}

function choiceMsgConstructor(idChoice){
    let choice = story[currentMsg].content.choices[idChoice]
    var newMessage = document.createElement('button');
    newMessage.addEventListener("click", (e) => {
        msgChoosed(idChoice)
    })
    newMessage.classList.add('message', 'you', 'preview');
    newMessage.textContent = choice.msg;
    return newMessage
}

function addPreviewChoices(choices){
    for (let i = 0; i < choices.length; i++) {
        messagesDiv.appendChild(choiceMsgConstructor(i))
    }
    scrollToBottom();
}

function computeMsgData(msgData){
    switch (msgData.type) {
        case "message":
            sendMsg(msgData.content.msg)
            if ("image" in msgData.content){/*TODO*/}
            currentMsg = msgData.content.next
            computeMsgData(story[currentMsg])
            break;
    
        case "choice":
            addPreviewChoices(msgData.content.choices)
            break;

        case "ending":
            sendMsg(msgData.content.ending_name)
            break;
            
        default:
            break;
    }
}

computeMsgData(story[currentMsg])