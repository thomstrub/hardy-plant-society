import React from 'react';
import {useHistory} from 'react-router-dom';
import './PlantPostCreatePage.css';
import * as plantPostAPI from '../../utils/plantPostService'
import PlantPostForm from '../../components/Forms/PlantPostForm/PlantPostForm'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'
import Header from '../../components/Header/Header'
import {  Grid } from 'semantic-ui-react'

// create PlantPost service folder, add functions



export default function PlantPostPage({ handleLogout, user, loading, setLoading}){
    
    const history = useHistory()

    async function handleAddPost(post){
        setLoading(true);
        const data = await plantPostAPI.create(post);
  
        // to check to make sure this is working
        console.log(data, ' data')
        
        setLoading(false);
        
        //Redirect to home page
        history.push('/plantswap')
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
                    
                    <PlantPostForm handleAddPost={handleAddPost} user={user}/>
                }
            </Grid.Column>
            </Grid.Row>
        </Grid>
            
        </>
    )
}