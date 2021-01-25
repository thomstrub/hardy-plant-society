import React, { useState, useEffect } from 'react';

import AdminPostFeed from '../../components/AdminPostFeed/AdminPostFeed';
import PageHeader from '../../components/Header/Header'
import {  Grid } from 'semantic-ui-react'
import * as adminPostAPI from '../../utils/adminPostService'

export default function Feed({user, handleLogout}){  


      
    const [posts, setPosts] = useState([]);


    async function getPosts(){
    
    try {
      const data = await adminPostAPI.getAll();
      setPosts([...data.posts])
    } catch(err){
      console.log(err, ' this is the error')
    }
    }  

    useEffect(() => {
        getPosts()
    }, [])
    



    return (
        
      <Grid centered >
        <Grid.Row>
          <Grid.Column>
            <PageHeader user={user} handleLogout={handleLogout}/>
          </Grid.Column>
        </Grid.Row>
        
        <Grid.Row>
        <Grid.Column style={{maxWidth: 1050}}>
          <AdminPostFeed posts={posts} user={user} />
        </Grid.Column>
        </Grid.Row>
      </Grid>
    )
}