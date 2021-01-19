import React, { useState } from 'react';

import { Button, Form, Radio, Segment } from 'semantic-ui-react'

export default function PlantPostForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    forSale: false,
    isSeed: false,
    isRootstock: false,
    dateCollected: new Date(),
    quantity: 1,
    description: "",
    photoUrl: "",
    plantName:""

  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  function handleToggle(e){
      setState({
          ...state,
          isSeed: state.isSeed ? false : true,
          isRootstock: state.isSeed ? false : true
      })
      
  }
  function handleSubmit(e){
    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('description', state.description)
    props.handleAddPost(formData)
    // Have to submit the form now! We need a function!
  }


  return (
    
  
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
              <h3>What are you contributing?</h3>
              <Radio label={state.isSeed ? "Seeds" : "Rootstock"} toggle value={state.isSeed} onChange={handleToggle}/>
              {state.isSeed ? 
              <p>Collected seeds, or a plant that has set seed and can be harvested</p>
              :
              <p>Mature plant with established roots or runners that can transplanted.</p>
              }
              <Form.Input
                  className="form-control"
                  name="plantName"
                  value={state.plantName}
                  placeholder="Common name or Scientific name"
                  onChange={handleChange}
                  required
              />
              <Form.Input
                  className="form-control"
                  name="description"
                  value={state.description}
                  placeholder={state.isSeed ? "Describe your collection of seeds or plant that has set seed" : "Describe your rootstock or runners that are ready to be transplanted"}
                  onChange={handleChange}
                  required
              />   
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />   
              <Button
                type="submit"
                className="btn"
              >
                SUBMIT
              </Button>
            </Form>
          </Segment>
     
   
  ); 
}