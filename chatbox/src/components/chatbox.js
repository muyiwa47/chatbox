import React, { useRef, useEffect } from 'react';
import img from './send-icon.png';
import closeIcon from './close-icon.png';

export default function Chatbox() {

 let activeResponse = false;
 const initMessages = ['Hello, how may I help you?', 'I can respond to full sentences, type a phrase you need help with'];
 const runEffectOnce = useRef(false);
 const sentence = ["Our goal is to make this tool as useful as possible", "For anyone who uses this tool and comes up with a way we can improve it",  "We'd love to know your thoughts. Please contact us", "So we can consider adding your ideas to make the random", "sentence generator the best it can be", "Thanks for your patient", "someone will be with you shortly"];

  useEffect(() => {
    if (runEffectOnce.current) return
    runEffectOnce.current = true;

    const [firstMessage, secondMessage] = initMessages;
    init(firstMessage)
   
    setTimeout(() => {
       if (activeResponse) return
         init(secondMessage)
    }, 5000)

  }, []);

  const getTimeStamp = () => {
    return new Date().toLocaleTimeString().replace(/:\d+ /, ' ');
  }

  const init = (message) => {
    
        let initMessageEl = document.createElement("section");
        initMessageEl.textContent = message;
        initMessageEl.classList.add("serverMessage");
        initMessageEl.setAttribute('aria-label' ,  `server response at ${getTimeStamp()}`);
        document.querySelector('#chatMessages').appendChild(initMessageEl);

    document.querySelector('#msg_send').addEventListener('keydown', (e) => {
       if (e.key === 'Enter') {
        sendChatboxMessage()
       }
    })

    document.querySelector('#replyBtn').addEventListener('click', () => {     
        sendChatboxMessage()
    })

    const scrollChatMessages = () => {
        let scrollMsg = document.querySelector('#chatMessages');
        scrollMsg.scrollTop = scrollMsg.scrollHeight ;
    }

    const sendChatboxMessage = () => {

        let response = document.querySelector('#msg_send').value

        if (response === "" || response == undefined) return
        activeResponse = true;

        let clientReplySectionEl = document.createElement("section")
        clientReplySectionEl.textContent = response;
        clientReplySectionEl.classList.add("clientMessage");
        clientReplySectionEl.setAttribute('aria-label' ,  `client said at ${getTimeStamp()}`)
        document.querySelector('#chatMessages').appendChild(clientReplySectionEl);
        scrollChatMessages();

        const typingIndicatorBubble = document.createElement('div');
        typingIndicatorBubble.classList.add('loader');
        typingIndicatorBubble.innerHTML = `<span></span><span></span><span></span>`
        document.querySelector('#chatMessages').appendChild(typingIndicatorBubble)

        const fakeServerResponse = () => {
            let serverResponseEl = document.createElement("section")
            serverResponseEl.textContent = sentence[Math.floor(Math.random() * 4)];
            document.querySelectorAll(".loader").forEach(loader => loader.remove())
            serverResponseEl.classList.add("serverMessage");
            serverResponseEl.setAttribute('aria-label' ,  `server response at ${getTimeStamp()}`)
            document.querySelector('#chatMessages').appendChild(serverResponseEl);
        }

        setTimeout(() => {
            fakeServerResponse()
            scrollChatMessages();
        }, 2000);

        document.getElementById('msg_send').value = "";

    }
}

return (
    <>
    <section className='chat-box' id="conversation" tabIndex="0" aria-label='Chatbox'  aria-live='polite'>
        <section className='chat-title'>
            Chat
            <span className='close-icon' role="button">
                <img src={closeIcon} alt=''/>
            </span>
        </section>

        <section className='chat-body'>
            <section className='chat-messages'id="chatMessages"></section>
            <section className='chat-input'>
                <input type="text" name="msg_send" id="msg_send" placeholder='How can we help you?' />
                <button id="replyBtn">
                  <img src={img} alt="reply" />
               </button>
            </section>
        </section>
    </section>
    </>
  )
}