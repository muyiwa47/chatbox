import React, { useRef, useEffect, useState } from 'react';
import Modal from './modal';

export default function Chatbox() {
 const [isOpen, setIsOpen] = useState(false)

 const onClose = () => {
    setIsOpen(!isOpen)
 }

 return (
    <>
    <button onClick={() => setIsOpen(!isOpen)} className="open-chatbox">Open Chatbot</button>
    {isOpen ? <Modal isOpen={isOpen} onClose={onClose}  /> : null}
    </>
  )
}