import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const SignUp = () => {

    const { signup } = useAuth()

    const [formData, setFormData] = useState({ email:"", password:"", confirm: "", fname:"", lname:"", sname:"", gender:"", birth:"", phone:"", address:"" })

    const fnameRef = useRef()
    const lnameRef = useRef()
    const snameRef = useRef()
    const genderRef = useRef()
    const birthRef = useRef()
    const phoneRef = useRef()
    const addressRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()
    const photoRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e => {
        const {name, valu} = e.target
        setFormData(oldData => ({...oldData, [name]: value}))
    })




    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== confirmRef.current.value) {
            return setError('Passwords do not match')
        }
        // console.log(photoRef.current.value)
        let picRef = photoRef.current.files[0]

        if (picRef && picRef.type.split("/")[0] != "image") {
            return setError('Profile pic must be a picture')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, fnameRef.current.value, lnameRef.current.value, snameRef.current.value, genderRef.current.value, birthRef.current.value, phoneRef.current.value, addressRef.current.value, picRef)

        } catch {
            setError('failed to create account')
        }
        setLoading(false)


    }

    return (
        <div>
            <h1> Sign Up Here</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <br></br>
                    <input required type='text' id='fname' name='fname' ref={fnameRef} placeholder='First Name'></input>
                </div>
                <div>
                    <label>Last Name:</label>
                    <br></br>
                    <input required type='text' id='lname' name='lname' ref={lnameRef} placeholder='Last Name'></input>
                </div>
                <div>
                    <label>Sur Name:</label>
                    <br></br>
                    <input required type='text' id='sname' name='sname' ref={snameRef} placeholder='Sur Name'></input>
                </div>
                <div>
                    <label>Gender:</label>
                    <br></br>
                    <select id='gender' name='gender' ref={genderRef}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <div>
                    <label>Birth Date:</label>
                    <br></br>
                    <input required type='date' id='date' name='date' ref={birthRef}></input>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <br></br>
                    <input required type='text' id='phone' name='phone' placeholder='0940229161' ref={phoneRef}></input>
                </div>
                <div>
                    <label>Address:</label>
                    <br></br>
                    <input required type='text' id='address' name='address' placeholder='Address' ref={addressRef}></input>
                </div>
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
                <div>
                    <label>Confirm Password:</label>
                    <br></br>
                    <input required type='password' id='confirm' name='confirm' placeholder='Confirm Password' ref={confirmRef}></input>
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <br></br>
                    <input type='file' id='photo' name='photo' ref={photoRef}></input>
                </div>
                <button type='submit' disabled={loading}>sign up</button>
            </form>
            <h5>Already have an account? <Link to="/login">Log in here</Link></h5>
        </div>
    )
}
