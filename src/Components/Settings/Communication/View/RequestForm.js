import { text } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Tools/Context/AuthContext'

export default function RequestForm({ packageId } ) {

    const { authState } = useContext(AuthContext)

    const [ groupSize, setGroupSize ] = useState()
    const [ duration, setDuration ] = useState()
    const [ textBody, setTextBody ] = useState("")

    const [ errMsg, setErrMsg] = useState("")
    const [ success, setSuccess] = useState("")


    const handleRequest = (e) => {
        e.preventDefault()
        
        if ( !groupSize || !duration || !textBody) {
            setErrMsg("Fill all the fields.")
        } else {

            const requestData = textBody + "_" + duration + "_" + groupSize + "_" + authState.email 

            const body = {
                packageId: packageId,
                textBody: requestData,
                sender: authState.id
            }
            
            axios.post('http://localhost:3001/messages/new', body, {
                headers: { token: localStorage.getItem('token')}
            }).then((response) => {
                if (response.data.error) {
                    setSuccess('')
                    setErrMsg(response.data.error)
                } else {
                    setSuccess(response.data.message)
                }
            })

        }


    }

    useEffect(() => {
        
    }, [])


    return (
        <div className='request-form'>

            <p className='response-msg' id={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
            <p className='response-msg' id={success ? 'successmsg' : 'offscreen'} aria-live="assertive">{success}</p>

            <form onSubmit={handleRequest}>
                <section>
                    <h4 className='input-label'>
                        Message
                    </h4>
                    <textarea
                        value={textBody}
                        className='input-text'
                        onChange={(e) => {
                            setTextBody(e.target.value)
                        }}
                    />
                </section>
                
                <section>
                    <h4 className='input-label'>
                        Preferred number of days
                    </h4>
                    <input
                        value={duration}
                        onChange={(e) => {
                            setDuration(e.target.value)
                        }}
                        type='number'
                        min='2'
                        max='8'
                        className='input-text'
                    />
                </section>
                <section>
                    <h4 className='input-label'>
                        Size of your group
                    </h4>
                    <input
                        onChange={(e) => {
                            setGroupSize(e.target.value)
                        }}
                        value={groupSize}
                        type='number'
                        min='1'
                        max='60'
                        className='input-text'
                    />
                </section>
                <button className='btn-secondary'>
                    Send request
                </button>
            </form>
        </div>
    )
}