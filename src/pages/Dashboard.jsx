import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router';
import Home_page from './Home_page'
import Navbar from '../components/Navbar'
import { FetchUrls } from '../API/CreateShortUrl.api';
import ShortUrls from '../components/ShortUrls';

const Dashboard = () => {

    return (
        <>
            <Home_page/>
            <ShortUrls />
        </>
    )
}

export default Dashboard