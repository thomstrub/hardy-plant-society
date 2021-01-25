import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Image, Icon, List, Grid } from 'semantic-ui-react';
import './Header.css'

export default function PageHeader({user, handleLogout}){
    return (
        <Segment clearing>
        <Grid centered>
        <Grid.Row>
            <Grid.Column style={{ maxWidth: 1150}}>
                <Header color="green" as='h2' floated="left" >
                    
                    <Link className="link" to="/"><Icon className="link" name="leaf"></Icon></Link>
                    
                </Header>
                <Header  floated="right" className="nav-container" >
                <List className="nav" horizontal>
                    
                    
                    {user ?
                        <>
                        <List.Item className="nav-item">
                            <Header as='h2'>
                                
                                <Link className="link" to='/plantswap/new'>{user.isAdmin ? "Post a Plant" : "Donate a Plant"}</Link>
                                
                            </Header>
                        </List.Item>
                        <List.Item className="nav-item">
                            <Header as='h2'>
                                <Link className="link" to='/plantswap'>Find a Plant</Link>
                            </Header>
                        </List.Item>
                        <List.Item className="nav-item">
                            <Header as='h2'>
                                <Link className="link" as='h2' to={`/${user.username}`}> Profile </Link>
                            </Header>
                        </List.Item>
                        <List.Item className="nav-item">
                            <Header as='h2'>
                                <Link className="link" to='/login'onClick={handleLogout}>Logout</Link>
                            </Header>
                        </List.Item>
                        </>
                        :
                        <List.Item className="nav-item">
                            <Header as='h2'>
                                <Link className="link" to='/login'>Login</Link>
                                    
                            </Header>
                        </List.Item>
                        }
                        
                    
                </List>
                        
                </Header>
                
            </Grid.Column>
        </Grid.Row>
            

        </Grid>
            
            
        </Segment>
    )
}