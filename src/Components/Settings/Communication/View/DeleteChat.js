import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

export default function DeleteChat({chatId}) {

    const [ errMsg, setErrMsg] = useState("")
    const [ success, setSuccess] = useState("")

    useEffect(() => {
        console.log(chatId)
    }, [])

    const handleRequest = (e) => {
        e.preventDefault()
        
        axios.delete(`https://morocco-my-trip-api.herokuapp.com/chat/deleteById/${chatId}`)
            .then((response) => {
                if (response.data.error) {
                    setErrMsg(response.data.error)
                } else {
                    setSuccess('Chat deleted!')
                }
            })

    }


    return (
        <section className='delete-chat'>
            <p className='response-msg' id={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
            <p className='response-msg' id={success ? 'successmsg' : 'offscreen'} aria-live="assertive">{success}</p>
            <button className='delete-chat-btn' onClick={(e) => {
                handleRequest(e)
            }}>Delete</button>
        </section>
    )

}