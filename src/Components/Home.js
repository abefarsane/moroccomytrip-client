import React, { Component, useContext, useEffect } from 'react';
import { AuthContext } from '../Tools/Context/AuthContext';
import SearchBar from '../Tools/sComponents/SearchBar';

export default function Home() {

    const { authState } = useContext(AuthContext)

    return (
        <div className='home-page'>
            <section className='home-header'>
                
            </section>

            <section className='search-section'>
                <SearchBar />
            </section>
        </div>
    )
}