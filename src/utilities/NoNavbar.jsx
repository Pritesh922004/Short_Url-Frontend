import React from 'react'
import { Outlet } from 'react-router'

const NoNavbar = () => {
    return (
        <>
        <Outlet/>
        </>
    )
}

export default NoNavbar