import React, { Component, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBoxArchive, faCircleUser, faCommentDots, faCropSimple, faDotCircle, faEllipsis, faListDots } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../../../Tools/Context/AuthContext'
import ModalCustom from '../../../ModalCustom';
import DeleteChat from '../View/DeleteChat';
import { io } from 'socket.io-client';

export default function Incoming() {

    const [chat, setChat] = useState([])
    const navigate = useNavigate()
    const { authState, setSocket } = useContext(AuthContext)
    const socket = io.connect('http://localhost:3001')


    const getMessages = () => {
        axios.get(`https://morocco-my-trip-api.herokuapp.com/chat/byUserId/${authState.id}`)
            .then((response) => {
                if (response.data.error) {

                } else {
                    setChat(response.data)
                    console.log(chat)
                }
            })
    }


    const handleRead = (id) => {

        console.log(id)

        const body = {
            hasBeenRead: true
        }

        axios.put(`https://morocco-my-trip-api.herokuapp.com/messages/update/${id}`, body, {
            headers: { token: localStorage.getItem('token')}
        })
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    getMessages()
                }
            })
    }




    useEffect(() => {
        axios.get(`https://morocco-my-trip-api.herokuapp.com/chat/byUserId/${authState.id}`)
            .then((response) => {
                if (response.data.error) {

                } else {
                    setChat(response.data)
                    console.log(chat)
                }
            })
    }, [])

    //x.textBody.split('_')[0].slice(0, 30).concat('...')

    return (
        <section className='incoming-messages'>
            <h2>Booking requests</h2>
            <section className='messages'>
            {
                chat.length > 0 ? (
                    
                    chat.map(x => {
                        return (
                            <section className='single-message message-read'>
                                <section>
                                        <FontAwesomeIcon icon={faBoxArchive} />
                                    </section>
                                    <section className='message-details' onClick={() => {
                                navigate(`/chat/${x.id}`)
                                socket.emit('join_chat', x.id)
                                setSocket(socket)
                            }}>
                                        <h5>{x?.Package?.title}</h5>
                                        
                                    </section>
                                    <ModalCustom btnText={<FontAwesomeIcon icon={faEllipsis} />} btnClass="options-chat">
                                    <h1 id='modal-title'>Delete chat</h1>
                                        <DeleteChat chatId={x.id}/>
                                    </ModalCustom>
                            </section>
                        )
                    })

                ) : (
                    <p>No booking requests to show.</p>
                )
            }
    
            </section>
        </section>
    )
}