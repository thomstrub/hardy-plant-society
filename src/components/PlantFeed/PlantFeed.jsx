import React from 'react';
import { Card  } from 'semantic-ui-react'
import PlantCard from '../PlantCard/PlantCard';


export default function PlantFeed({posts, isProfile, user, deletePost, isAdminPost}){

    return (
        <Card.Group itemsPerRow={3} stackable>
           
                {posts.map((post) => {
                return ( 
                        <PlantCard post={post} key={post._id} isProfile={isProfile} user={user} deletePost={deletePost} isAdminPost={isAdminPost}/>
                    )
                })}
        </Card.Group>
  
    )
}