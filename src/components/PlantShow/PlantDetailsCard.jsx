import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'

const PlantDetailsCard = ({post}) => (

  <Grid columns={2} divided>
    <Grid.Row>
      <Grid.Column>
      <div>
            <h2>More info about this plant:</h2>
            
        </div>
      <Segment raised>
            <h2>{post.plant.species}</h2>
            <h3>{post.plant.commonName}</h3>
        
            <p>{post.plant.description}</p>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment raised>
            <Image src={post.plant.photoUrl} />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>

)

export default PlantDetailsCard