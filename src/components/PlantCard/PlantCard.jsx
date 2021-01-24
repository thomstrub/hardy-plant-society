import React from 'react';
import { Card, Icon, Image, Feed, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function PlantCard({post, isProfile, user, addLike, removeLike}) { 






  return (
    <Card color="green" key={post._id}>
     
      <Image src={`${post.photoUrl}`} wrapped ui={false} />

      {isProfile ? ''
        :  
        <Link to={`/${user.username}`}>
          <Card.Content >
          
            <Card.Header floated="left">
              <Image
                  floated='left'
                  size='large'
                  verticalAlign='middle'
                  avatar
                  src={post.user.photoUrl ? post.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
              />
              </Card.Header>
              <Card.Header floated="right">{post.user.isAdmin ? `${post.user.username} - Admin` : post.user.username}</Card.Header>
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
          {post.user._id === user._id ? 
          <Button >Delete</Button>
          :
          <Button >Request</Button>
          }
          
      </Card.Content>
    </Card>
  );
}

export default PlantCard;