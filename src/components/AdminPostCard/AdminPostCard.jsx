import React from 'react'
import { Image, Item, Header } from 'semantic-ui-react'

import './AdminPostCard.css'


export default function AdminPostFeed({post, removePost, user}){

    const handleClick = () => removePost(post._id);

    return(
       
        <Item>
          <Item.Image size='small' src={post.photoUrl} />
    
          <Item.Content>
            <Item.Header >
            <div className="space">
                <span>{post.title}</span>
                {user.isAdmin ? 
                    <span style={{color: "darkred"}} onClick={handleClick}>X</span>
                :
                    ""
                }
                
            </div>
                    
                
            
            </Item.Header>
            <Item.Meta>{post.date}</Item.Meta>
            <Item.Description>
              <p>{post.body}</p>
            </Item.Description>
            <Item.Extra>{post.user ? post.user.username : "HPS Admin"}</Item.Extra>
          </Item.Content>
        </Item>
    
        
      
    )

} 