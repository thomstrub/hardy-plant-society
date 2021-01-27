import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import EmailForm from '../Forms/EmailForm/EmailForm'

function EmailModal({post, user}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Request Plant</Button>}
    >

    <EmailForm setOpen={setOpen} post={post} user={user}/>


      
    </Modal>
  )
}

export default EmailModal