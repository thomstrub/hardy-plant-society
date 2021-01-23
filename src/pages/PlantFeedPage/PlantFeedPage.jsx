import React, { useState, useEffect } from 'react';

import PlantFeed from '../../components/PlantFeed/PlantFeed';

import {  Grid } from 'semantic-ui-react'
import * as plantPostAPI from '../../utils/plantPostService'

export default function Feed({user}){  


      // Plant Posts are created and set as state
    const [posts, setPosts] = useState([]);
    async function getPosts(){
    
    try {
      const data = await plantPostAPI.getAll();
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
            Header
          </Grid.Column>
        </Grid.Row>
        
        <Grid.Row>
        <Grid.Column style={{maxWidth: 450}}>
          <PlantFeed posts={posts} isProfile={false} numPhotosCol={1} user={user} />
        </Grid.Column>
        </Grid.Row>
      </Grid>
    )
}