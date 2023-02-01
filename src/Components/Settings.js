import React, { Component, useContext, useState} from 'react';
import { Modal, Button } from 'react-bootstrap'
import { AuthContext } from '../Tools/Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPackage, faEnvelope, faCubes } from '@fortawesome/free-solid-svg-icons'
import EditUser from './Settings/User/EditUser'
import EditPackage from './Settings/Package/EditPackage';
import Messages from './Settings/Communication/Messages';

export default function Settings() {

    const { authState } = useContext(AuthContext)
    const [ toDisplay, setToDisplay ] =  useState(<EditUser />)


    return (
        <div className='settings-page'>
            <h4>Settings</h4>
            <p className='sm-comment'>Manage all of your affairs here</p>

            <section className={authState.admin ? 'settings-options' : 'settings-options options-normal'}>
                <section onClick={() => setToDisplay(<EditUser />)}>
                    <FontAwesomeIcon icon={faUser} />
                </section>
                {authState.admin && (
                    <section onClick={() => setToDisplay(<EditPackage />)}> 
                        <FontAwesomeIcon icon={faCubes} />
                    </section>
                )}
                <section onClick={() => setToDisplay(<Messages />)}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </section>
            </section>


            <section className='settings-display'>
                {toDisplay}
            </section>
        </div>
    )
}