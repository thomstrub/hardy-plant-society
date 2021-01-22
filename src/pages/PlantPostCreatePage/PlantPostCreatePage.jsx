import React, { useState } from 'react';
import './PlantPostCreatePage.css';
import PlantPostForm from '../../components/Forms/PlantPostForm/PlantPostForm'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'

import {  Grid } from 'semantic-ui-react'

// create PlantPost service folder, add functions

export default function PlantPostPage(props){
 


    return (
        <>
            <Grid centered >
            <Grid.Row>
            <Grid.Column>
                Header
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column style={{ maxWidth: 750 }}>
                {props.loading ?
                    <LoadingMsg />
                    :
                    
                    <PlantPostForm handleAddPost={props.handleAddPost} user={props.user}/>
                }
            </Grid.Column>
            </Grid.Row>
        </Grid>
            
        </>
    )
}