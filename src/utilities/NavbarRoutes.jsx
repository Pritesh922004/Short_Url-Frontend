import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const NavbarRoutes = () => {
    return (
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}

export default NavbarRoutes