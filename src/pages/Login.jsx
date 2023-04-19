import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import "../pages css/form.css"

export const Login = () => {
    
    const navigate = useNavigate()

    const { login } = useAuth()

    const [formData, setFormData] = useState({email : "", password : ""})

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData((oldData) => ({...oldData, [name]: value }))
    }


    async function handleSubmit(e) {
        console.log(formData)
        e.preventDefault()
        if (formData.password.length < 6) {
            return setError("Password length must be greater than 6.")
        }
        console.log("started2")

        try {
            setLoading(true)
            await login(formData)
            setError("")
            navigate("/")
            setRedirect(true)

        } catch {
            setError("Please enter correct user credintial!")
        }
        setLoading(false)
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='form__title'> Sign In Here</h1>
                <div className='form__card'>
                    <label className='form__label'>E - mail:</label>
                    <br></br>
                    <input className='form__input' required type='text' id='email' name='email' placeholder='E - Mail' onChange={handleChange}></input>
                    <br></br>
                </div>
                <div className='form__card'>
                    <label className='form__label'>Password:</label>
                    <br></br>
                    <input className='form__input' required type='password' id='password' name='password' placeholder='Password' onChange={handleChange}></input>
                </div>
                <h5 className="form__error">{error}</h5>
                <button className='form__submit' type='submit' disabled={loading}>sign in</button>
                <h5 className='form__footer'>Don't have an account? <Link to="/signup">Sign Up here</Link></h5>
            </form>
        </div>
    )
}
