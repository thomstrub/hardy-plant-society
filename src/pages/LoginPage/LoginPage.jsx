import React, { useState } from 'react';
import './LoginPage.css';
import { useHistory } from 'react-router-dom';
import userService from '../../utils/userService';
import LoginForm from '../../components/Forms/LoginForm/LoginForm'

export default function LoginPage(props){
    const [invalidForm, setValidForm] = useState(false);
    const [error, setError ]          = useState('')
    const [state, setState]       = useState({
        email: '',
        password: '',
    })
  
    const history = useHistory();
    
    function handleChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
   
    

    async function handleSubmit(e){
      e.preventDefault()
              
      try {
          await userService.login(state);
          // Route to wherever you want!
          props.handleSignUpOrLogin() // 
          history.push('/')
          
        } catch (err) {
          // Invalid user data (probably duplicate email)
          setError(err.message)
        }
    }

    return (
        <>
          <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} state={state} error={error} invalidForm={invalidForm}/>
        </>
      );
}

