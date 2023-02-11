import { faPeopleArrows, faPeopleGroup, faCheck, faPersonWalking, faCircleXmark, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Tools/Context/AuthContext';
import ModalCustom from './ModalCustom'
import Login from './Login'
import RequestForm from './Settings/Communication/View/RequestForm';
import { CustomSliderServices } from '../Tools/sComponents/CustomSlider';
import Badge from 'react-bootstrap/Badge';

export default function Package() {

    const {id} = useParams()
    const [pack, setPack] = useState({
        Images: []
    })
    const [error, setError] = useState("")
    const [ booked, setBooked ] = useState(false)

    const { authState } = useContext(AuthContext)

    const getPackageDetails = () => {
        axios.get(`http://localhost:3001/packages/byID/${id}`)
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

        axios.get(`http://localhost:3001/chat/check-if-already-sent/${id}/${authState.id}`)
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
                                <img src={pack.Images[0]?.urlPath}/>
                                <h2 className='h5-response'>{pack.title}</h2>
                                <p className='animate__animated animate__flash animate__delay-2s'>Hover here to see the image!</p>
                                
                            </section>
                        </section>
                        <section className='package-data'>
                            <section className='days'>
                                <h3>For <strong>{pack.duration + (pack.duration > 1 ? " days" : " day")}</strong></h3>
                            </section>
                            <section className='people'>
                                <h3>{pack.people + (pack.people > 1 ? " people" : " person")}</h3>
                            </section>
                            <section className='price'>
                                <h3>Starting from <strong>€{pack.price}</strong></h3>
                            </section>
                        </section>

                        <section className='request'>
                                <ModalCustom btnText={"Start a booking request"} btnClass='chat-btn'>

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
                        <section className='description'>
                            <h2>About this package</h2>
                            <p>{pack.description}</p>
                        </section>

                        <section className='contain'>
                            <section className='services-included'>
                                <h2>What is included?</h2>
                                    <section className='services'>

                                    <CustomSliderServices>
                                    {
                                        pack.Services?.length > 0 ? (
                                            pack.Services.map(x => {

                                                return x.included && (
                                                    <Badge>{x.serviceBody}</Badge>
                                                )

                                                
                                            })
                                        ) : (
                                            <h5>No Services</h5>
                                        )
                                    }
                                    </CustomSliderServices>
                                </section>
                            </section>

                            <section className='services-not-included'>
                                <section className='services'>

                                    <CustomSliderServices>
                                    {
                                        pack.Services?.length > 0 ? (
                                            pack.Services.map(x => {

                                                return !x.included && (
                                                    <Badge>{x.serviceBody}</Badge>
                                                )

                                                
                                            })
                                        ) : (
                                            <h5>No Services</h5>
                                        )
                                    }
                                    </CustomSliderServices>
                                </section>
                                <h2>What is not included?</h2>
                            </section>
                        </section>
                    </>
                )
            }
        </div>
    )
}