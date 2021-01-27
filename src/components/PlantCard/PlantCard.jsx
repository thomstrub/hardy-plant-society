import React from 'react';
import { Card, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import EmailModal from '../EmailModal/EmailModal'
import ConfirDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'

function PlantCard({post, isProfile, user, deletePost, isAdminPost}) { 



  function returnButton(){
      if(isProfile){
        return(
        <ConfirDeleteModal deletePost={deletePost} post={post} isAdminPost={isAdminPost}/>
        )
      } else {
       if(post.user._id === user._id){
        return ("")
       } else {return (<EmailModal post={post} user={user}/>)}
            
      }
  }


  return (
    <Card color="green" key={post._id}>
     
     
        <Image src={`${post.photoUrl}`} alt={post.plant.species} wrapped ui={false}/>
    
     
      

      {isProfile ? ''
        :  
        <Link to={`/${user.username}`}>
          <Card.Content>
          
            
              <Header  floated="left" style={{marginLeft: "10px", marginTop: "10px"}}>
                <Image
                    size='large'
                    avatar
                    src={post.user.photoUrl ? post.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
                />
                {post.user.username}
              </Header>
              <Header  color="orange" floated="right" style={{ marginTop: "15px"}}>
                {post.forSale ? "$5" : ""}
              </Header>
              
              
              
              
              
          </Card.Content>
        </Link>
      }
        <Card.Content style={{ minWidth: "105%"}} >
        
            <Card.Header as={Link} to={`/plantswap/${post._id}`}>
        
            {post.plant.species} <br/>
            "{post.plant.commonName}"
        
            </Card.Header>
            <Card.Meta>
                {post.isSeed?
                <p>Available as seed</p>
                :
                <p>Available as rootstock</p>
                }
            </Card.Meta>
        
        
        
            <Card.Description>
            <p>{post.description}</p> 
            </Card.Description>
        
        
        </Card.Content>
      <Card.Content  extra >
         {returnButton()}
          
      </Card.Content>
    </Card>
  );
}

export default PlantCard;