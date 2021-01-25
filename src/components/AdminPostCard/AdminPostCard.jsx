import React from 'react'
import { Image, Item } from 'semantic-ui-react'

export default function AdminPostFeed({post}){

    

    return(
       
        <Item>
          <Item.Image size='small' src={post.photoUrl} />
    
          <Item.Content>
            <Item.Header as='a'>{post.title}</Item.Header>
            <Item.Meta>{post.date}</Item.Meta>
            <Item.Description>
              <p>{post.body}</p>
            </Item.Description>
            <Item.Extra>{post.user ? post.user.username : "HPS Admin"}</Item.Extra>
          </Item.Content>
        </Item>
    
        
      
    )

} 