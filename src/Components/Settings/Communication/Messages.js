import React, { Component, useState, useEffect, useContext } from 'react';
import Incoming from './Controller/Incoming'
import Sent from './Controller/Sent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../../Tools/Context/AuthContext';
import { faUser, faCubes, faInbox, faReply } from '@fortawesome/free-solid-svg-icons';

export default function Messages() {


    const { authState } = useContext(AuthContext)
    const [ toDisplay, setToDisplay ] =  useState(<Incoming />)

    useEffect(() => {
        document.getElementById('incoming').classList.add('selected')
    }, [])

    return (
        <div className='settings-page'>
            <section className="settings-options options-normal">
                <section id='incoming' onClick={() => (
                        setToDisplay(<Incoming />),
                        document.getElementById('incoming').classList.add('selected'),
                        document.getElementById('sent').classList.remove('selected')
                    )}>
                    <FontAwesomeIcon icon={faInbox} />
                </section>
                <section id='sent' onClick={() => (
                    setToDisplay(<Sent />),
                    document.getElementById('sent').classList.add('selected'),
                    document.getElementById('incoming').classList.remove('selected')
                )}> 
                    <FontAwesomeIcon icon={faReply} />
                </section>
            </section>


            <section className='settings-display'>
                {toDisplay}
             </section>
        </div>
    )
}