import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {

    const [ search, setSearch ] = useState("")

    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate(`/results/${search}`)
    }


    return (
        <div className='search-bar'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Marrakech Trip, North Morocco...'
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <button className='font-awesome-btn'><FontAwesomeIcon icon={faSearch} /></button>
            </form>
        </div>
    )
}