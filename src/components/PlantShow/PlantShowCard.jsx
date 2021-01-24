import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import PlantDetailsCard from './PlantDetailsCard'
import './PlantShow.css'
const PlantShowCard = ({post}) => (

  <Grid columns={1} >
  <Segment raised>
    <Grid.Row>
      <Grid.Column className="center">
        <Segment >
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