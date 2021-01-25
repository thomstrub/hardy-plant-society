import React from 'react';
import { Card, Icon, Image, Feed, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import EmailModal from '../EmailModal/EmailModal'

function PlantCard({post, isProfile, user, deletePost}) { 



  function returnButton(){
      if(isProfile){
        return(<Button onClick={() => {deletePost(post._id)}}>Delete</Button>)
      } else {
       if(post.user._id === user._id){
        return ("")
       } else {return (<EmailModal post={post} user={user}/>)}
            
      }
  }


  return (
    <Card color="green" key={post._id}>
     
      <Image src={`${post.photoUrl}`} wrapped ui={false} />

      {isProfile ? ''
        :  
        <Link to={`/${user.username}`}>
          <Card.Content >
          
            <Card.Header >
              <Header floated="left">
                <Image
                    floated='left'
                    size='large'
                    verticalAlign='middle'
                    avatar
                    src={post.user.photoUrl ? post.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
                />
                {post.user.username}
              </Header>
              <Header color="orange" floated="right">
                {post.forSale ? "$5" : ""}
              </Header>
              
              </Card.Header>
              
          </Card.Content>
        </Link>
      }
      <Card.Content extra textAlign={'left'}>
      
      <Card.Header as={Link} to={`/plantswap/${post._id}`}>
      
        {post.plant.species} <br/>
        "{post.plant.commonName}"
      
        </Card.Header>
         
      
      
      
        <Card.Description>
           <p>{post.description}</p> 
        </Card.Description>
      
      
      </Card.Content>
      <Card.Content textAlign="center">
         {returnButton()}
          
      </Card.Content>
    </Card>
  );
}

export default PlantCard;