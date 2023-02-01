import { faPeopleArrows, faPeopleGroup, faCheck, faPersonWalking, faCircleXmark, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Tools/Context/AuthContext';
import ModalCustom from './ModalCustom'
import Login from './Login'
import RequestForm from './Settings/Communication/View/RequestForm';

export default function Package() {

    const {id} = useParams()
    const [pack, setPack] = useState({
        Images: []
    })
    const [error, setError] = useState("")
    const [ booked, setBooked ] = useState(false)

    const { authState } = useContext(AuthContext)

    const getPackageDetails = () => {
        axios.get(`https://morocco-my-trip-api.herokuapp.com/packages/byID/${id}`)
            .then((response) => {
                if (response.data.error) {
                    setPack(null)
                    setError(response.data.error)
                } else {
                    setPack(response.data)
                }
            })
    }

    const checkIfAlreadyBooked = () => {

        axios.get(`https://morocco-my-trip-api.herokuapp.com/chat/check-if-already-sent/${id}/${authState.id}`)
            .then((response) => {
                if (response.data.status) {
                    setBooked(true)
                } else {
                    setBooked(false)
                }
            })
            
    }


    useEffect(() => {
        getPackageDetails()
        checkIfAlreadyBooked()
    }, [])


    return (
        <div className='package animate__animated animate__fadeIn'>

            { 
                pack == null ? (
                    <h1>{error}</h1>
                ) : (
                    <>
                        <section className='package-header'>
                            <section className='header-details'>
                                <h1>{pack.title}</h1>
                                <p>{pack.location}</p>
                                </section>
                                <section className='booking-request'>
                                    <ModalCustom btnText={<FontAwesomeIcon icon={faComments} />} btnClass='chat-btn'>

                                    {
                                        authState.status ? (
                                            <>
                                            {
                                                booked ? (
                                                    <h3 className='status-booking'>Already <strong> booked!</strong></h3>
                                                ) : (
                                                    <>
                                                        <h1 id='modal-title'>Booking request</h1>
                                                        <RequestForm packageId={id} />
                                                    </>

                                                )
                                            }

                                            </>
                                        ) : (
                                            <>
                                                <h1 id='modal-title'></h1>
                                                <Login redirectInstructions={`/package/${id}`}/>
                                            </>
                                        )
                                    }

                                
                                    </ModalCustom>
                                </section>
                        </section>
                        <section className='package-imgs '>
                            <img src={pack?.Images[0]?.urlPath}/>
                        </section>
                        <section className='package-info'>
                            <section className=''>
                                <p>How many days?</p>
                                
                                <h4>{(pack.duration)}  {pack.duration > 2 ? " Days" : " Day"} and  {(pack.duration - 1) + (pack.duration - 1 > 1 ? " Nights" : " Night")} </h4>
                            </section>
                            <section className=''>
                                <p>For</p>
                                <div>
                                    <h4>{pack.people}</h4>
                                    {
                                        pack.people > 1 ? (
                                            <FontAwesomeIcon icon={faPeopleGroup}/>
                                        ) : (
                                            <FontAwesomeIcon icon={faPersonWalking}/>
                                        )
                                    }
                                    
                                </div>
                            </section>
                            <section className=''>
                                <p>At</p>
                                <h4>{pack.price} <span>MAD</span></h4>
                            </section>
                        </section>
                        <section className='package-details'>
                            <section className='package-description' >
                                <p>Description</p>
                                <p>{pack.description}</p>
                            </section>
                            <section className='package-services'>
                                <p>What is included and not?</p>
                                <div>
                                    <section className='services-included'>
                                        {
                                            pack?.Services?.map(x => {
                                                return x.included && <span><FontAwesomeIcon icon={faCheck}/>{x.serviceBody}</span>
                                            })
                                        }
                                    </section>
                                    <section className='services-not-included'>
                                        {
                                            pack?.Services?.map(x => {
                                                return !x.included && <span>{x.serviceBody}<FontAwesomeIcon icon={faCircleXmark}/></span>
                                            })
                                        }
                                    </section>
                                </div>
                            </section>
                            <section className='package-description'>
                                <p>Description</p>
                                <p>{pack.description}</p>
                            </section>
                        </section>
                    </>
                )
            }
        </div>
    )
}