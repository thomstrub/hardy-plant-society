import React, {useState, useEffect} from 'react';
import { Button, Header, Modal } from 'semantic-ui-react'
export default function EmailForm({setOpen, post, user}) {
 
  const [state, setState] = useState({
    message: '',
	name: post.user.username,
	sender: user.username,
	plant: post.plant.species,
	toEmail: post.user.email,
	replyEmail: user.email
  })

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
	  e.preventDefault()

	  const templateId = 'template_uimoece';

	sendFeedback(templateId, {message: state.message, plant: state.plant, to_name: state.name, from_name: state.sender, send_to: state.toEmail ,reply_to: state.replyEmail})
	// close modal
	setOpen(false)
  }

  async function sendFeedback (templateId, variables) {
	await window.emailjs.send(
  	'service_uqrfsb8', templateId,
  	variables
  	).then(res => {
    	console.log('Email successfully sent!')
  	})
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
  
	return (
		<>
		<Modal.Header>Send an Email</Modal.Header>
		<Modal.Content>
		  <Modal.Description>
			<Header>Let's see if it works</Header>
			<form className="message">
    	
			<div>
			<textarea
				id="message"
				name="message"
				onChange={handleChange}
				placeholder="Post some lorem ipsum here"
				required
				value={state.message}
				style={{width: '100%', height: '150px'}}
			/>
			</div>
			
  	</form>
		  </Modal.Description>
		</Modal.Content>
		<Modal.Actions>
		  <Button color='black' onClick={() => setOpen(false)}>
			Cancel
		  </Button>
		  <Button
			content="Send Email"
			labelPosition='right'
			icon='checkmark'
			onClick={handleSubmit}
			positive
		  />
		</Modal.Actions>
	</>
	)
  


}

