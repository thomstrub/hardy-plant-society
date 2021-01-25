import React, {useState, useEffect} from 'react';

export default function EmailForm(props) {
 
  const [state, setState] = useState({
    feedback: '',
    name: '',
    email: 'email@example.com'
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

	sendFeedback(templateId, {message: state.message, from_name: state.name, reply_to: this.state.email})
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
  	<form className="test-mailing">
    	<h1>Let's see if it works</h1>
    	<div>
      	<textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="Post some lorem ipsum here"
        	required
        	value={this.state.message}
        	style={{width: '100%', height: '150px'}}
      	/>
    	</div>
    	<input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
  	</form>
	)
  


}