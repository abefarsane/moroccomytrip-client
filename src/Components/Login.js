import React, { useState, useRef, useEffect, useContext, Component } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Tools/Context/AuthContext';


export default function Login({ redirectInstructions }) {

    const [email, setEmailLog] = useState('')
    const [pwd, setPwdLog] = useState('')
    const [loginStatus, setLogin] = useState("Not logged");
    
    const navigate = useNavigate();
    const {setAuthState} = useContext(AuthContext)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')


    /*SETTING ERROR */ 
    useEffect(() => {
        setErrMsg('')
    }, [])
    /* SETTING SUCCESS */
    useEffect(() => {
        setSuccess('')
    }, [])

    const login = (e) => {
        e.preventDefault() 

        const data = {
            email: email,  
            pwd: pwd
        }
        Axios.post('https://morocco-my-trip-api.herokuapp.com/auth/login', data)
        .then((response)=> {
            if(response.data.error) {
                setErrMsg(response.data.error)
            } else {
                localStorage.setItem("token", response.data.token)
                setAuthState({email: response.data.email, id: response.data.id, status: true, username: response.data.username, admin: response.data.admin})

                if (redirectInstructions == null) {
                    navigate('/');
                } else {
                    navigate(redirectInstructions)
                }

            }
            
        })
    }
    

    return (
        <div className="log-form">

            <section className='header'>
                <section>
                    <h1>Login</h1>
                    <h2 className='sub-title'>Fill out your details</h2>
                </section>
                <p id={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
            </section>

                <form onSubmit={login}>
                    <section>
                        <h4 className='input-label'>Email</h4>
                        <input
                            className='input-text'
                            type='email' 
                            onChange={(e) => {
                                setEmailLog(e.target.value);
                            }}
                            value={email}
                            required
                        />
                    </section>
                    <section className='pwd'>
                        <h4 className='input-label'>Password</h4>
                        <input
                            className='input-text'
                            type='password'
                            onChange={(e) => {
                                setPwdLog(e.target.value);
                            }}
                            required
                        />
                    </section>
                    <section>
                        <h5 className='form-label-sec'>Don't have an account yet? <a href='/signup'>Sign up</a></h5>
                        <button className='btn-primary'>Login</button>
                    </section>
                    
                </form>
            </div>
    )
}