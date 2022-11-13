import React from 'react'
import './Input.css'
import {BiSend} from 'react-icons/bi' 

const Input = ({message,setMessage, sendMessage }) => (
    
        <form className='form'>
            <input 
                className='input'
                type="text"
                placeholder='Type a message...'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null }
            />
            <button className='sendButton' onClick={(e) => sendMessage(e)}><BiSend className='send' /></button>
        </form>
    
)

export default Input
