import React, { useState } from 'react';
import * as AdminPostAPI from '../../utils/adminPostService'
import AdminPostForm from '../../components/Forms/AdminPostForm/AdminPostForm'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'
import Header from '../../components/Header/Header'
import {  Grid } from 'semantic-ui-react'

// create PlantPost service folder, add functions

export default function AdminPostCreatePage({handleAddPost, handleLogout, user, loading, setLoading}){
 
    async function handleAddPost(post){
        setLoading(true);
        const data = await AdminPostAPI.create(post);
  
        // to check to make sure this is working
        console.log(data, ' data')
        // data is the response from our create function in controllers/posts
        // update the state
        setLoading(false);
        // setPosts([data.post,  ...posts])
        // to conifrm this check the devtools for your feed component
        
    }

    return (
        <>
            <Grid centered >
            <Grid.Row>
            <Grid.Column>
                <Header user={user} handleLogout={handleLogout}/>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column style={{ maxWidth: 750 }}>
                {loading ?
                    <LoadingMsg />
                    :
                    
                    <AdminPostForm handleAddPost={handleAddPost} user={user}/>
                }
            </Grid.Column>
            </Grid.Row>
        </Grid>
            
        </>
    )
}