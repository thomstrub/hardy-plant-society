import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import PlantDetailsCard from './PlantDetailsCard'

const PlantShowCard = ({post}) => (

  <Grid columns={1} >
  <Segment raised>
    <Grid.Row>
      <Grid.Column>
        <Segment raised>
            <Image src={post.photoUrl} />
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Segment >
            <PlantDetailsCard post={post}/>
        </Segment>
      </Grid.Column>
    </Grid.Row>
    </Segment>
  </Grid>

)

export default PlantShowCard