import React, { useState } from 'react'
import SignupPage from '../SignupPage/SignupPage'

export default function AdminSignupPage({handleSignUpOrLogin}){
    const[admin, setAdmin] = useState(true)
    return(
        <SignupPage handleSignUpOrLogin={handleSignUpOrLogin} admin={admin}/>
    )
}