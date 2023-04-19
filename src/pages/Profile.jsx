import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { useAuth } from '../context/AuthContext'
import { storage } from '../config/firebase'
import ProfilePic from '../assests/images/profile.png'

export const Profile = () => {

    const { currentUser, cookies, updatePass, updateEmailAddress, updateDetail, updateProfilePic } = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [Form, setForm] = useState({
        fname : cookies.get("firstName"),
        lname : cookies.get("lastName"),
        sname : cookies.get("surName"),
        gender: cookies.get("gender"),
        birth : cookies.get("birthDate"),
        phone : cookies.get("phoneNumber"),
        address: cookies.get("address"),
        email: currentUser.email,
        password: ""
    })
    
    const [proPic, setProPic] = useState("")

    const photoRef = useRef()


    useEffect(() => {
        getPic()
    }, [])

    const getPic = async () => {
        console.log("------------------------------")

        if (currentUser.photoURL) {
            const p = await getDownloadURL(ref(storage, currentUser.photoURL))
            setProPic(() => p)
            console.log(proPic, "---")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((Form) => ({
            ...Form,
            [name]: value

        }))
    }



    const handleSubmitProfile = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            console.log(Form)
            await updateDetail(Form)
        } catch {
            setError('failed to update account')
        }
        setLoading(false)
    }


    const handleUpdateProfilPic = async () => {
        let picRef = photoRef.current.files[0]
        if (picRef && picRef.type.split("/")[0] !== "image") {
            return setError('Profile pic must be a picture')
        }
        try {
            setLoading(true)
            await updateProfilePic(picRef)

        } catch {
            setError("Error Updating profile pic")
        }
        setLoading(false)
        window.location.reload()
    }

    const handleEmail = async () => {
        try {
            setLoading(true)
            await updateEmailAddress(Form["email"])
        } catch {
            setError("Error Updating Email Address")
        }
        setLoading(false)
        window.location.reload()

    }
    const handlePassword = async () => {
        try {
            setLoading(true)
            await updatePass(Form["password"])
        } catch {
            setError("Error Updating Password")
        }
        setLoading(false)
        window.location.reload()

    }
    return (
        <div >
            {currentUser && (
                <>
                    <div>
                        <img src={proPic || ProfilePic} alt='Profile Pic'></img>
                        <input type='file' id='photo' name='photo' ref={photoRef}></input>
                        <button disabled={loading} type='submit' onClick={handleUpdateProfilPic}>Update Profile Picture</button>
                    </div>

                    <div>
                        <h4>Email Address:</h4>
                        <input type='text' id='email' name='email' onChange={handleChange} defaultValue={currentUser.email}></input>
                        <button disabled={loading} type='submit' onClick={handleEmail}>Update Email Address</button>
                    </div>

                    <div>
                        <h4>Password:</h4>
                        <input type='password' id='password' name='passsword' onChange={handleChange} ></input>
                        <button disabled={loading} type='submit' onClick={handlePassword} >Update Password</button>
                    </div>

                    <form onSubmit={handleSubmitProfile}>
                        <div>
                            <h4>First Name:</h4>
                            <input type='text' id='fname' name='fname' onChange={handleChange} defaultValue={cookies.get("firstName")}></input>
                        </div>
                        <div>
                            <h4>Last Name:</h4>
                            <input type='text' id='lname' name='lname' onChange={handleChange} defaultValue={cookies.get("lastName")}></input>
                        </div>
                        <div>
                            <h4>Sur Name:</h4>
                            <input type='text' id='sname' name='sname' onChange={handleChange} defaultValue={cookies.get("surName")}></input>
                        </div>
                        <div>
                            <h4>Gender:</h4>
                            <select id='gender' name='gender' onChange={handleChange}  defaultChecked={cookies.get("gender")}>
                                <option defaultValue='male'>Male</option>
                                <option defaultValue='female'>Female</option>
                            </select>
                        </div>
                        <div>
                            <h4>Birth Date:</h4>
                            <input type='date' id='birthDate' name='birthDate' onChange={handleChange} defaultValue={cookies.get("birthDate")}></input>
                        </div>
                        <div>
                            <h4>Phone Number:</h4>
                            <input type='text' id='phone' name='phone' onChange={handleChange} defaultValue={cookies.get("phoneNumber")}></input>
                        </div>
                        <div>
                            <h4>Address:</h4>
                            <input type='text' id='address' name='address' onChange={handleChange} defaultValue={cookies.get("address")}></input>
                        </div>
                        <button type='submit' disabled={loading}>Upadat Profile</button>
                    </form>
                </>

            )}
        </div>
    )
}