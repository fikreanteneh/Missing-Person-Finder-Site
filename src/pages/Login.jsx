import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Login = () => {


    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value.length < 6) {
            return setError('Passwords should be at least 6 characters')
        }

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)

        } catch {
            setError('failed to log in')
        }
        setLoading(false)


    }

    return (
        <div>
            <h1> Sign Up Here</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>E - mail:</label>
                    <br></br>
                    <input required type='text' id='email' name='email' placeholder='E - Mail' ref={emailRef}></input>
                </div>

                <div>
                    <label>Password:</label>
                    <br></br>
                    <input required type='password' id='password' name='password' placeholder='Password' ref={passwordRef}></input>
                </div>

                <button type='submit' disabled={loading}>log in</button>
            </form>

            <h5>Don't have an account? <Link to="/signup">Sign Up here</Link></h5>
        </div>
    )
}
