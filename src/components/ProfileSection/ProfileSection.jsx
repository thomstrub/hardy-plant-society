import React from 'react';
import {  Image, Grid, Segment } from 'semantic-ui-react';


export default function ProfileBio({user}) { 
  return (
  <Grid textAlign='center' columns={2}>
    <Grid.Row>
      <Grid.Column width="4">
        <Image src={`${user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} `} avatar size='small' />
      </Grid.Column>
      <Grid.Column width="4" textAlign="left" style={{ maxWidth: 450 }}>
        <Segment vertical>
           <h3>{user.isAdmin ? <span> {user.username}  - Admin</span> : user.username}</h3>
        </Segment>
        <Segment>
           <span> Bio: {user.bio}</span>
        </Segment>
          
      </Grid.Column>
    </Grid.Row>
  </Grid>

  );
}