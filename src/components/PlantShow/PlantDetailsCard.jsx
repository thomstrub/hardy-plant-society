import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import DetailsList from '../DetailsList/DetailsList'

const PlantDetailsCard = ({post}) => (

  <Grid columns={2} divided>
    <Grid.Row>
      <Grid.Column width="10">
      <div>
            <h2>More info about this plant:</h2>
            
        </div>
      <Segment raised>
            <h2>{post.plant.species}</h2>
            <h3>{post.plant.commonName}</h3>
        
            <p>{post.plant.description}</p>
        </Segment>
      </Grid.Column>
      <Grid.Column width="6">
        <Segment raised>
            <Image src={post.plant.photoUrl} />
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column >
      <Segment >
            <h3>Other common names for this species: </h3>
            <DetailsList list={post.plant.otherCommonNames}/>
        </Segment>
      </Grid.Column>
      <Grid.Column >
        <Segment >
            <h3>Native to: </h3>
            <DetailsList list={post.plant.distribution}/>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>

)

export default PlantDetailsCard