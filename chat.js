/**
 * Get messages on page load
 * push input text and username text to API when send button is clicked
 * 
 */

function makeMessage(chat) {
    let field = document.querySelector('.chatfield');
    let fullmessage = document.createElement('div');
    fullmessage.classList.add('messageunit');

    let nametext = document.createElement('div');
    nametext.classList.add('nametext');
    
    let from = document.createElement('p');
    from.classList.add('name');
    from.textContent = chat.from + " says:";

    let text = document.createElement('p');
    text.classList.add('text');
    text.textContent = chat.message;

    let time = document.createElement('p');
    time.classList.add('timesig');
    time.textContent = chat.added;

    nametext.appendChild(from);
    nametext.appendChild(text);
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
            makeMessage(response.chats[i]);
        }
    });
    pull.send();
}



window.addEventListener('load', function () {
    getMessage();

    let getbtn = document.querySelector('.get');
    getbtn.addEventListener('click', function () {     
        console.log('Hi Mom');
});

    let sendbtn = document.querySelector('.send');
    sendbtn.addEventListener('click', function () {
        let username = document.querySelector('.usrnm-input');
        let messageinput = document.querySelector('.message-input');
        
        let push = new XMLHttpRequest();
        push.addEventListener('load', function () {
            console.log('message received');
        });
        push.send(JSON.stringify({
            from: username.value,
            message: messageinput.value, 
        }));
    });
});