import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../Tools/sComponents/SearchBar'

export default function Results() {

    

    
    let { search } = useParams()

    const navigate = useNavigate()
    
    let found = []
    const [ results, setResults ] = useState([])

    const [ urls, setUrls] = useState([])


    const getResults = () => {

        axios.get('https://morocco-my-trip-api.herokuapp.com/packages/all')
            .then((response) => {
                if (response.data.status) {
                    response.data.packages.map(x => {
                        if ((x.title.toLowerCase()).includes(search.toLowerCase())) {
                            found.push(x)
                        }
                    })
                    setResults(found)
                    
                } else {
                    
                }
            })
    }

    
    useEffect(() => {
        getResults()
    }, [])


    return (
        <div className='results-page'>
            <h1>Here's your results</h1>
            <SearchBar />
            <section className='our-packages-results'>
            {
                
                results.length > 0 ? (
                    
                    results.map((x, key) => {

                        
                        
                        return (

                            <section className='single-package section-style animate__animated animate__fadeIn' key={key} onClick={() => {
                                navigate(`/package/${x.id}`)
                            }}>
                                <section className='pack-img'>
                                    {
                                        <img src={x.Images[0].urlPath} />
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