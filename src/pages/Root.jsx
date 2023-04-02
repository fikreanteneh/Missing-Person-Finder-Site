import React from 'react'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'

export const Root = () => {
    return (
        <div>
            <Navbar/>
            
            <main>
                <Outlet />
            </main>

        </div>

    )
}
