import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faChartSimple, faFaceSmile, faIndustry, faMessage, faPaperPlane, faUser, faUserCircle, faPeopleGroup, faUserShield, faBackspace, faBackward, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../../Tools/Context/AuthContext';
import { text } from '@fortawesome/fontawesome-svg-core';
import io from 'socket.io-client'



export default function ChatPage() {

    const {chatId} = useParams()
    const [ chatHistory, setChatHistory ] = useState([])


    const [textToSend, setTextToSend ] = useState('')

    const { authState, socket, setSocket } = useContext(AuthContext)


    const [senderData, setSenderData] = useState({})


    const [url, setUrl] = useState("")

    

    const navigate = useNavigate()

    const getData = async () => {

        await axios.get(`https://morocco-my-trip-api.herokuapp.com/chat/chatHistory/${chatId}`)
            .then((response) => {
                if (response.data.error) { 

                } else {
                    setChatHistory(response.data.data)
                    setSenderData(response.data.senderData)
                }
            })

    }

    const getPackageImage = async () => {
        await axios.get(`https://morocco-my-trip-api.herokuapp.com/packages/package-image/${chatHistory.Package.id}`)
            .then((response) => {
                setUrl(response.data)
            })
    }

    const handleReply = async (e) => {
        e.preventDefault()

        if (textToSend != "") { 

            const bodyData = {
                ChatId: chatId,
                UserId: authState.id,
                text_body: textToSend

            }
            await socket.emit('send_text', bodyData)

            axios.post(`https://morocco-my-trip-api.herokuapp.com/chat/send-text/${chatHistory.id}`, {
                sender: authState.id,
                text_body: textToSend
            }).then((response) => {
                setTextToSend("")
            })
        } else {
            console.log('Fill text box.')
        }

    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        
        socket.on('new_text', (data) =>{
            setChatHistory(data)
        })
        socket.on('receive_message', (data) =>{
            setChatHistory(data)
        })
    }, [socket])



    return (
        <div className='chat-page'>
            <div className='chat-section'>
                <section className='chat-details'>

                    {
                        
                        authState.admin ? (
                            
                            <>
                                <FontAwesomeIcon icon={faUserCircle} />
                                <section>
                                    <h4>{senderData.username}</h4>
                                    <p>Our client since <strong>{senderData?.createdAt?.split('-')[0]}</strong></p>
                                </section>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faUserShield}/>
                                <section>
                                    <h4>Admin</h4>
                                    <p>Management team</p>
                                </section>
                            </>
                        )
                    }

                    
                </section>

                <section className='chat-history' id='chatScroll'>
                {
                        chatHistory.length < 1 ? (
                            <section>
                                <h3>Start a new conversation!</h3>
                            </section>
                        ) : (
                            getPackageImage(),
                            chatHistory?.Messages.map((x, key) => {

                                let style = authState.id == x.UserId ?
                                'single-chat-receiver' : 'single-chat-sender'
                                
                                return (
                                    key == 0 ? (

                                        <>
                                            <section className='message-package'>
                                                <section className={style}>
                                                    <img src={url} />
                                                    <h2>{chatHistory.Package.title}</h2>
                                                    <h3>{x.text_body.split('_')[1]} <FontAwesomeIcon icon={faPeopleGroup}/></h3>
                                                    <h3>{x.text_body.split('_')[2]} days</h3>
                                                    <h3>{x.text_body?.split('_')[3]}</h3>
                                                </section>
                                            </section>
                                            <section className={style}>
                                                <p>{x.text_body?.split('_')[0]}</p>
                                            </section>

                                        </>
                                    ) : (
                                        <>
                                            <section className={style}>
                                                <p>{x.text_body?.split('_')[0]}</p>
                                            </section>
                                        </>
                                    )
                                )
                            })
                        )
                    }
                </section>


                <section className='chat-form'>
                    <form onSubmit={handleReply}>
                        <input
                            id='message-input'
                            type='text'
                            className='input-text'
                            placeholder='Your message'
                            value={textToSend}
                            onChange={(e) => {
                                setTextToSend(e.target.value)
                            }}
                        />
                        <button className='btn-secondary'><FontAwesomeIcon icon={faPaperPlane}/></button>
                    </form>
                </section>
            </div>
        </div>
    )
}