import React, { useState } from 'react';
import './PlantPostCreatePage.css';
import PlantPostForm from '../../components/Forms/PlantPostForm/PlantPostForm'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'
import Header from '../../components/Header/Header'
import {  Grid } from 'semantic-ui-react'

// create PlantPost service folder, add functions

export default function PlantPostPage({handleAddPost, handleLogout, user, loading}){
 


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
                    
                    <PlantPostForm handleAddPost={handleAddPost} user={user}/>
                }
            </Grid.Column>
            </Grid.Row>
        </Grid>
            
        </>
    )
}