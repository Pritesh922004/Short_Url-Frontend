import React from 'react'
import SigninForm from '../components/SigninForm'
import SignupForm from '../components/SignupForm'
import { useState } from 'react'

const Auth_page = () => {
    const [login, setLogin] = useState(true);
    return (
        <>
        {login ? <SigninForm state={setLogin}/> : <SignupForm state={setLogin}/>}
        </>
    )
}

export default Auth_page