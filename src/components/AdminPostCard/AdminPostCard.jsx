import React from 'react'
import { Item } from 'semantic-ui-react'
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'

import './AdminPostCard.css'


export default function AdminPostFeed({post, removePost, user, isAdminPost}){

    

    return(
       
        <Item>
          <Item.Image rounded size='medium' src={post.photoUrl} />
    
          <Item.Content>
            <Item.Header  >
            <div className="space">
                <span>{post.title}</span>
                {user.isAdmin ? 
                    <ConfirmDeleteModal post={post} removePost={removePost} isAdminPost={isAdminPost} />
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