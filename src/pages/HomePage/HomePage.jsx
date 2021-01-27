import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection'
import AdminPostFeed from '../../components/AdminPostFeed/AdminPostFeed';
import PageHeader from '../../components/Header/Header'
import {  Grid } from 'semantic-ui-react'
import * as adminPostAPI from '../../utils/adminPostService'

export default function Feed({user, handleLogout, setIsAdminPost, isAdminPost}){  


      
    const [posts, setPosts] = useState([]);


    async function removePost(postId) {
        try {
            const data = await adminPostAPI.removePost(postId);
            getPosts();
        } catch (err) {
            console.log(err)
        }
    }

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
        setIsAdminPost(true)
    }, [])
    



    return (
        
      <Grid centered >
        <Grid.Row>
          <Grid.Column>
            <PageHeader user={user} handleLogout={handleLogout}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column >
          <HeroSection />
        </Grid.Column>
        </Grid.Row>
     
        
        <Grid.Row>
        <Grid.Column style={{maxWidth: 1050}}>
        {user ?
            <AdminPostFeed posts={posts} user={user} removePost={removePost} isAdminPost={isAdminPost}/>
        :
            ""
        }
          
        </Grid.Column>
        </Grid.Row>
      </Grid>
    )
}