import React, { useState } from 'react';
import './PlantPostPage.css';
import PlantPostForm from '../../components/Forms/PlantPostForm/PlantPostForm'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'
import * as plantPostAPI from '../../utils/plantPostService'
import {  Grid } from 'semantic-ui-react'

// create PlantPost service folder, add functions

export default function PlantPostPage(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    async function handleAddPost(post){
        setLoading(true);
        const data = await plantPostAPI.create(post);

        // to check to make sure this is working
        console.log(data, ' data')
        // after this we'll want to update state
        // after we get back our new post
        // data is the response from our create function in controllers/posts
        // update the state
        setLoading(false);
        setPosts([data.post,  ...posts])
        // to conifrm this check the devtools for your feed component
        
    }


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
                {loading ?
                    <LoadingMsg />
                    :
                    
                    <PlantPostForm handleAddPost={handleAddPost}/>
                }
            </Grid.Column>
            </Grid.Row>
        </Grid>
            
        </>
    )
}