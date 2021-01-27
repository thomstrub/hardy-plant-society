import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import PlantDetailsCard from './PlantDetailsCard'
import './PlantShow.css'
const PlantShowCard = ({post}) => (

  <Grid columns={1} >
  <Segment raised>
    <Grid.Row>
      <Grid.Column className="center">
        <div className="image-div" >
            <Image rounded bordered className="image" src={post.photoUrl} />
        </div>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <div className="content-div">
            <PlantDetailsCard post={post}/>
        </div>
      </Grid.Column>
    </Grid.Row>
    </Segment>
  </Grid>

)

export default PlantShowCard