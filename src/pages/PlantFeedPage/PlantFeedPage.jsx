import React, { useState, useEffect } from 'react';

import PlantFeed from '../../components/PlantFeed/PlantFeed';

import {  Grid } from 'semantic-ui-react'

export default function Feed({user, posts, handleLogout}){  



      



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