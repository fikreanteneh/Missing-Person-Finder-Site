import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, NavLink } from 'react-router-dom'


export const Navbar = () => {

    const [error, setError] = useState("")
    const { currentUser, logout, cookies } = useAuth()

    // console.log(cookies.get("firstName"), cookies.get("phoneNumber"), cookies.get("address"), cookies.get("gender"))

    async function handleClick() {
        setError("")
        try {
            await logout()
        } catch {
            setError("failed to log out")
        }

    }

    return (
        <div>
            {!currentUser && (
                <menu>
                    <Link to="/signup">Sign up</Link>
                    <Link to="/login">Log in</Link>
                </menu>
            )}
            {currentUser && (
                <menu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="posts">Posts</NavLink>
                    <NavLink to="/">Contact</NavLink>
                    <NavLink to="/">About</NavLink>
                    <NavLink to="profile">Profile</NavLink>
                    <NavLink to="/" onClick={handleClick}>Log out</NavLink>
                </menu>
            )}

        </div>
    )
}
