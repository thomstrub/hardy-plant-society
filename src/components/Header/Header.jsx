import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Icon, List, Grid } from 'semantic-ui-react';
import './Header.css'

export default function PageHeader({user, handleLogout}){
    return (
        <Segment clearing>
        <Grid centered>
        <Grid.Row>
            <Grid.Column style={{ maxWidth: 1150}}>
                <Header color="green" as='h3' floated="left" >
                    
                    <Link className="link" to="/"><Icon className="link" name="leaf"></Icon></Link>
                    
                </Header>
                <Header  as={Link} to="/" floated="left" >
                
                <h3 style={{color: "green"}}>Hardy Plant Society Northwest</h3>
                    
                </Header>
                <Header floated="right" className="nav-container" >
                <List style={{marginBottom: "-20px"}} className="nav" horizontal>
                   
                    
                    {user ?
                        <>
                        {user.isAdmin ?
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                    <Link style={{color: "green"}}className="link" to='/admin/posts/new'>New Admin Post</Link>
                            </Header>
                        </List.Item>
                        :
                        ''
                        }
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                
                                <Link className="link" to='/plantswap/new'>{user.isAdmin ? "Post a Plant" : "Donate a Plant"}</Link>
                                
                            </Header>
                        </List.Item>
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                <Link className="link" to='/plantswap'>Find a Plant</Link>
                            </Header>
                        </List.Item>
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                <Link className="link" as='h3' to={`/${user.username}`}> Profile </Link>
                            </Header>
                        </List.Item>
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                <Link className="link" to='/login'onClick={handleLogout}>Logout</Link>
                            </Header>
                        </List.Item>
                        </>
                        :
                        <List.Item className="nav-item">
                            <Header as='h3'>
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