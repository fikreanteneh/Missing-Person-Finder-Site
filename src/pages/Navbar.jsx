import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "../pages css/Navbar.css"

export const Navbar = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { currentUser, logout} = useAuth()
    async function handleClick() {
        setError("")
        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    if (error) {
        return <h1>{Error}</h1>
    }

    return (
        <div className='header'>
            <div class="header__logo">
                <p>  </p>
            </div>
            <div className="burger">
                <div className="burger__line"></div>
                <div className="burger__line"></div>
                <div className="burger__line"></div>
            </div>
            {!currentUser && (
                <menu className='header__nav-bar'>
                    <Link className='header__items' to="/signup">Sign up</Link>
                    <Link className='header__items' to="/login">Log in</Link>
                </menu>
            )}
            
            {currentUser && (
                <menu className='header__nav-bar'>
                    <nav className='header__menu'>
                        <NavLink className="header__items" to="/">Home</NavLink>
                        <NavLink className="header__items" to="posts">Posts</NavLink>
                        <NavLink className="header__items" to="profile">Profile</NavLink>
                        <NavLink className="header__items" to="/logout" onClick={handleClick}>Log out</NavLink>
                    </nav>
                </menu>
            )}
        </div>
    )
}
