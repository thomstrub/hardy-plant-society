import React from 'react'
import { Item } from 'semantic-ui-react'
import AdminPostCard from '../AdminPostCard/AdminPostCard'

export default function AdminPostFeed({posts, removePost, user, isAdminPost}){

    

    return(
        <>
        <h2 style={{color:"orange"}}>Hardy Plant Society News</h2>
        <Item.Group>
            {posts.map((post) => {
                            return ( 
                                    <AdminPostCard post={post} key={post._id} removePost={removePost} user={user} isAdminPost={isAdminPost}/>
                                )
                            })}
      </Item.Group>
      </>
    )

} 


