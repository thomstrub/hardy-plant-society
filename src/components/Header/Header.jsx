import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Header, Segment, Icon, List, Grid } from 'semantic-ui-react';
import './Header.css'

export default function PageHeader({user, handleLogout}){
    const history = useHistory();
    const path = history.location.pathname.slice(1)
    console.log(path, "path")
    return (
        <Segment clearing style={{marginBottom: "30px"}}>
        <Grid centered>
        <Grid.Row>
            <Grid.Column style={{ maxWidth: 1150, marginTop: "20px"}}>
                <Header style={{marginBottom: "-20px"}} className="logo" color="green" as='h3' floated="left" >
                    
                    <Link className="link" to="/"><Icon name="leaf"></Icon></Link>
                    
                </Header>
                <Header style={{marginBottom: "-20px", marginLeft: "-15px"}} className="logo" as={Link} to="/" floated="left" >
                
                <h3 style={{color: "green"}}>Hardy Plant Society Northwest</h3>
                    
                </Header>
                <Header floated="right" className="nav-container" >
                <List style={{marginBottom: "-20px"}} className="nav" horizontal>
                   
                    
                    {user ?
                        <>
                        {user.isAdmin ?
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                    <Link 
                                        style={path === "admin/posts/new" ? {fontWeight: "bold"} : {}}
                                        className="link" 
                                        to='/admin/posts/new'
                                    >
                                        New Admin Post
                                    </Link>
                            </Header>
                        </List.Item>
                        :
                        ''
                        }
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                
                                <Link 
                                    style={path === "plantswap/new" ? {fontWeight: "bold"} : {}} 
                                    className="link" 
                                    to='/plantswap/new'
                                >
                                        {user.isAdmin ? "Post a Plant" : "Donate a Plant"}
                                </Link> 
                                
                                
                            </Header>
                        </List.Item>
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                <Link 
                                    style={path === "plantswap" ? {fontWeight: "bold"} : {}} 
                                    className="link" 
                                    to='/plantswap'
                                >
                                    Find a Plant
                                </Link>
                            </Header>
                        </List.Item>
                        <List.Item className="nav-item">
                            <Header as='h3'>
                                <Link 
                                    style={path === user.username ? {fontWeight: "bold"} : {}}
                                    className="link" as='h3' to={`/${user.username}`}> Profile </Link>
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