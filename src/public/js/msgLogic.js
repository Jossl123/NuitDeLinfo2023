// var currentMsg = 0
// var messagesDiv = document.getElementById("messages");

// function scrollToBottom() {
//     messagesDiv.scrollTop = messagesDiv.scrollHeight;
// }

// scrollToBottom();

// function sendMsg(msg, byYou = false){
//     var newMessage = document.createElement('div');
//     newMessage.classList.add('message');
//     if(byYou)newMessage.classList.add('you');
//     newMessage.textContent = msg;
//     messagesDiv.appendChild(newMessage);
//     scrollToBottom();
// }

// function removeElementsByClass(className){
//     var elements = document.getElementsByClassName(className);
//     while(elements.length > 0){
//         elements[0].parentNode.removeChild(elements[0]);
//     }
// }

// function removePreviewsMsg(){
//     removeElementsByClass("preview")
// }

// function msgChoosed(choosenId){
//     removePreviewsMsg()
//     let choice = story[currentMsg].content.choices[choosenId]
//     sendMsg(choice.msg, true)
//     currentMsg = choice.next
//     computeMsgData(story[currentMsg])
// }

// function choiceMsgConstructor(idChoice){
//     let choice = story[currentMsg].content.choices[idChoice]
//     var newMessage = document.createElement('button');
//     newMessage.addEventListener("click", (e) => {
//         msgChoosed(idChoice)
//     })
//     newMessage.classList.add('message', 'you', 'preview');
//     newMessage.textContent = choice.msg;
//     return newMessage
// }

// function addPreviewChoices(choices){
//     for (let i = 0; i < choices.length; i++) {
//         messagesDiv.appendChild(choiceMsgConstructor(i))
//     }
//     scrollToBottom();
// }

// function computeMsgData(msgData){
//     switch (msgData.type) {
//         case "message":
//             sendMsg(msgData.content.msg)
//             if ("image" in msgData.content){/*TODO*/}
//             currentMsg = msgData.content.next
//             computeMsgData(story[currentMsg])
//             break;
    
//         case "choice":
//             addPreviewChoices(msgData.content.choices)
//             break;

//         case "ending":
//             sendMsg(msgData.content.ending_name)
//             break;
            
//         case "error":
//             console.log("error with data", msgData)
//             break
//         default:
//             break;
//     }
// }
// async function getMsgData() {
//     let url = './message.php?id=' + currentMsg;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         return data;
//     } catch (err) {
//         return {"type": "error"};
//     }
// }

// async function show() {
//     let data = await getMsgData();
//     return data;
// }

// // Call show and log the result
// show().then(result => console.log(result));
var messagesDiv = document.getElementById("messages");

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

scrollToBottom();

async function getMsgData(msgId) {
    let url = './message.php?id=' + msgId;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return {"type": "error"};
    }
}

async function sendMsg(msg, byYou = false) {
    var newMessage = document.createElement('div');
    newMessage.classList.add('message');
    if (byYou) newMessage.classList.add('you');
    newMessage.textContent = msg;
    messagesDiv.appendChild(newMessage);
    scrollToBottom();
}

function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removePreviewsMsg() {
    removeElementsByClass("preview");
}

async function msgChoosed(choice) {
    removePreviewsMsg();
    await sendMsg(choice.msg, true);
    currentMsg = choice.next;
    await computeMsgData(await getMsgData(currentMsg));
}

function choiceMsgConstructor(choice) {
    var newMessage = document.createElement('button');
    newMessage.addEventListener("click", (e) => {
        msgChoosed(choice);
    });
    newMessage.classList.add('message', 'preview', "you");
    newMessage.textContent = choice.msg;
    return newMessage;
}

async function addPreviewChoices(msgData) {
    var choiceDiv = document.getElementById("choice");
    for (let i = 0; i < msgData.content.choices.length; i++) {
        choiceDiv.appendChild(choiceMsgConstructor(msgData.content.choices[i]));
    }
    scrollToBottom();
}

async function computeMsgData(msgData) {
    switch (msgData.type) {
        case "message":
            await sendMsg(msgData.content.msg);
            if ("image" in msgData.content) {
                /* TODO */
            }
            currentMsg = msgData.content.next;
            await computeMsgData(await getMsgData(currentMsg));
            break;

        case "choice":
            await addPreviewChoices(msgData);
            break;

        case "ending":
            await sendMsg(msgData.content.ending_name);
            alert("You've unlocked a new ending "+ msgData.content.ending_name)
            document.location.href="/"
            break;

        case "error":
            console.log("error with data", msgData);
            break;

        default:
            break;
    }
}

async function main() {
    await computeMsgData(await getMsgData(currentMsg));
}

main();


function youKnowWhatItMeans(){
    document.location.href="/rythm"
}