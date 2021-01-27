import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function ConfirDeleteModal({post, deletePost, isAdminPost, removePost}) {
  const [open, setOpen] = React.useState(false)

  function handleDelete(e){
    e.preventDefault();

    // remove post is coming from the admin posts on the home page
    // delete post is coming from the plant post feed on the profile page
    // isAdminPost is true if the delete function is coming from the admin
    // posts on the home page
    
    isAdminPost ? removePost(post._id) : deletePost(post._id)
    console.log('confirm delete')
    setOpen(false)
    
  }

  return (
    <Modal
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={isAdminPost ? <span  style={{color: "darkred"}}>Delete Post</span> : <Button>Delete</Button>}
    >
<Header icon>
        <Icon name='archive' />
        Delete Post
      </Header>
      <Modal.Content>
        <p>
          Are you sure you want to delete this post?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button  color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={handleDelete}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirDeleteModal