import axios, { all } from 'axios';
import React, { Component, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge'
import {useNavigate} from 'react-router-dom'
import SearchBar from '../Tools/sComponents/SearchBar'

export default function Packages() {
    
    let navigate = useNavigate()
    const [ allPackages, setAllPackages] = useState([])
    const [ urls, setUrls] = useState([])
    const [path, setPath] = useState("")

    const defaultImg = "https://morocco-my-trip-api.herokuapp.com/public/on-missing-image.jpg"

    const getPackages = () => {
        axios.get('https://morocco-my-trip-api.herokuapp.com/packages/all')
            .then((response) => {
                if(response.data.status) {
                    setAllPackages(response.data.packages)
                } else {
                    setAllPackages(response.data.packages)
                }
            }) 
    }

    useEffect(() => {
        getPackages()
        console.log(allPackages)
    }, [])
    
    return (
        <div className='our-packages'>
            <h1>Our packages</h1>
            <SearchBar />
            <section className='our-packages-results'>
            {
                
                allPackages.length > 0 ? (
                    
                    allPackages.map((x, key) => {

                        
                        //setPath(urls[key])
                        
                        
                        return (

                            <section className='single-package animate__animated animate__fadeIn section-style' key={key} onClick={() => {
                                navigate(`/package/${x.id}`)
                            }}>
                                <section className='pack-img'>
                                    {
                                        <img
                                            src={x.Images[0].urlPath}
                                        />          
                                    }
                                    
                                </section>
                                <section className='pack-details'>
                                    <h4>{x.title}</h4>
                                    <h5>{x.duration} {x.duration > 1 ? "DAYS" : "DAY"}</h5>
                                </section>
                                
                            </section>
                        )
                    })
                ) : (
                    <h5>No packages available :(</h5>
                )
            }
            </section>
        </div>
    )
}