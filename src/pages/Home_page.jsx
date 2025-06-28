import React from 'react'
import { useState } from 'react';
import ShortUrlFrom from '../components/ShortUrlFrom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { VerifyUser } from '../API/User.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/Auth.Slice';


const Home_page = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const verify = async () => {
            try {
                const response = await VerifyUser();
                dispatch(login(response.user));
            } catch (error) {
            }
        };
        verify();
    }, [])

    return (
        <>
            <div className="max-w-md mx-auto mt-1  my-4 p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">URL Shortener</h1>
                <ShortUrlFrom />
            </div>
        </>
    )
}

export default Home_page