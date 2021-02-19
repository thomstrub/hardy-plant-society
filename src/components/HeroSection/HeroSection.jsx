import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Icon, Grid} from 'semantic-ui-react'
import './HeroSection.css'

export default function HeroSection({user}){
    return(
        
        
          
        <Grid  className='hero' columns={1} verticalAlign={"middle"} style={{ color: "white", minHeight: "60vw", padding: '1em 0em', margin: "-58px 0 20px 0" }}>
            <Grid.Row>
                <Grid.Column>
                <h3 style={{marginLeft: "40%"}}>Welcome to the Pacific Northwest Hardy Plant Society</h3>
        
                <Button as={Link} to={user === null ? "/login" : "/plantswap"} style={{backgroundColor: "green", marginLeft: "60%"}} primary size='huge'>
                Find a Plant
                <Icon name='right arrow' />
                </Button>
                </Grid.Column>
            </Grid.Row>
        
        </Grid>
           
            
        
        
    )
}