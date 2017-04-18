/**
 * Get messages on page load
 * push input text and username text to API when send button is clicked
 * 
 */

function makeMessage(chat) {
    let field = document.querySelector('.chatfield');
    let fullmessage = document.createElement('div');
    fullmessage.classList.add('messageunit');
    fullmessage.setAttribute('id', 'watch-' + chat.id);

    let nametext = document.createElement('div');
    nametext.classList.add('nametext');
    
    let from = document.createElement('p');
    from.classList.add('name');
    from.textContent = chat.from + " says:";

    let text = document.createElement('p');
    text.classList.add('text');
    text.textContent = checkLink(chat.message);
// Below: What I am trying to do is take the chat.message and do the following: 
// step 1: split the sentence by spaces and divide into an array.
// step 2: take each part of array and split into an array of characters. 
// step 3: if first 4 characters are "http", then I need to join that string together and convert it into a link
// otherwise, join back and return as normal.
   
    function linkify(string) {
        let splitString = string.split("");
        if (splitString[0] === 'h' && splitString[1] === 't' && splitString[2] === 't' && splitString[3] === 'p') {
            let joinedString = splitString.join('');
            console.log(joinedString);
            let newLink = document.createElement('a');
            newLink.setAttribute('href', joinedString);
            return newLink;
        } else return splitString.join('');
    }
    function checkLink(message) {
        let linkCheck = message.split(' '); 
        for (let i = 0; i < linkCheck.length; i++) {
        linkCheck[i] = linkify(linkCheck[i])
    };  
    return linkCheck.join(' ');
    };
    text.textContent = checkLink(chat.message);

    let time = document.createElement('p');
    time.classList.add('timesig');
    time.textContent = chat.added;



    nametext.appendChild(from);
    nametext.appendChild(text);
    // nametext.appendChild(newLink);
    fullmessage.appendChild(nametext);
    fullmessage.appendChild(time);
    field.appendChild(fullmessage);
}

function getMessage() {
    let pull = new XMLHttpRequest();
    pull.open('GET', 'https://tiy-28202.herokuapp.com/chats');
    pull.addEventListener('load', function () {
        let response = JSON.parse(pull.responseText);
        console.log(response);
        for (let i = 0; i < response.chats.length; i++) {
            if (document.querySelector('#watch-' + response.chats[i].id) === null) {
                makeMessage(response.chats[i]);
            }

        }
    });
    pull.send();
}



window.addEventListener('load', function () {
    getMessage();

    let getbtn = document.querySelector('.get');
    getbtn.addEventListener('click', function () {     
        getMessage();
});

    let sendbtn = document.querySelector('.send');
    sendbtn.addEventListener('click', function () {
        let username = document.querySelector('.usrnm-input');
        let messageinput = document.querySelector('.message-input');
        
        let push = new XMLHttpRequest();
        push.open('POST', 'https://tiy-28202.herokuapp.com/chats')
        push.addEventListener('load', function () {
            console.log('message received');
        });
        push.send(JSON.stringify({
            from: username.value,
            message: messageinput.value, 
        }));
        messageinput.value = "";
        getMessage();
    });
});

