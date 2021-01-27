import React, { useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Form, Segment } from 'semantic-ui-react'

export default function AdminPostForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    title: '',
    body: '',
    date: new Date()
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

// datepicker handler
  function handleDate(event, data){
    setState({
        ...state,
        date: data.value
        })
    }

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('title', state.title)
    formData.append('body', state.body)
    props.handleAddPost(formData)
    
  }


  return (
    
  
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            <h3>What's new at the Hardy Plant Society?</h3>
              <Form.Input
                  className="form-control"
                  name="title"
                  value={state.title}
                  placeholder="Name this post..."
                  onChange={handleChange}
                  required
              />
              
                <Form.TextArea
                  className="form-control"
                  name="body"
                  value={state.body}
                  placeholder="Tell us your thoughts or describe the event..."
                  onChange={handleChange}
                  
              />   
              <h3>If this is an event, when is it?</h3>
              <SemanticDatepicker value={state.dateCollected} onChange={handleDate} />
              <h3>Upload a Photo</h3>
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
                Submit Post
              </Button>
            </Form>
          </Segment>
     
   
  ); 
}