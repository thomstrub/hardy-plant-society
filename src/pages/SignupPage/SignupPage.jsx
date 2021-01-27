import React, { useState } from 'react';
import userService from '../../utils/userService';
import { useHistory } from 'react-router-dom';
import SignupForm from '../../components/Forms/SignupForm/SignupForm'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'

export default function SignUpPage(props){
  const [invalidForm, setValidForm] = useState(false)
  const [error, setError ] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [state, setState]  = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    bio: '',
    isAdmin: props.admin ? true : false,
    adminPw:""
  });

  const history = useHistory()
  
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    // add this later
    e.preventDefault();
    setLoading(true);
    if(props.admin && state.adminPw !== "felco2"){
      setError("Wrong credentials")
      console.log(error)
    } else{
    // Photos have to be sent over as FormData
    // They send over the form in multiparts (multipe requests to the server)

      const formData = new FormData();
      formData.append('photo', selectedFile);


      // generating rest of form data by looping over the state object!
      for (let key in state){
        formData.append(key, state[key])
      }
      //fyi if you log out formData you won't see anything you have to use the folllowing

      // Display the key/value pairs
      // for (var pair of formData.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]); 
      // }

      // SO now we have are data prepared to send over in our formData object
      try {
        // refere to the utils/userService, to look at the signup fetch function
        await userService.signup(formData);
        // setTheUser in our app
        props.handleSignUpOrLogin() // gets the token from localstorage and updates the user state in our app.js
        // with the correct user object from the current token
        // then route to the homepage
        setLoading(false);
        history.push('/') // defined above from react-router-dom
        // after this we can go whereever

      } catch(err){
        console.log(err.message)
        setError(err.message)
      }
    }
  }

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }
 
    
    return (
      <>
        {loading ?
        <LoadingMsg />
        :
        <SignupForm 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          handleFileInput={handleFileInput}
          state={state}
          error={error}
          invalidForm={invalidForm}
        />
        }
        
      </>
      );   
    
}
