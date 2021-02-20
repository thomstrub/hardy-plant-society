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
            <Grid.Column style={{ maxWidth: 1150, margin: "30px 0 -20px 0"}}>
            
                <div>
                    <Header className="logos" color="green" as='h3' floated="left" >
                        
                        <Link style={{color: "green"}} to="/"><Icon name="leaf"></Icon></Link>
                        
                    </Header>
                    <Header style={{marginLeft: "-15px"}} className="logos" as={Link} to="/" floated="left" >
                    
                    <h3 className="logos logos-hover">Hardy Plant Society Northwest</h3>
                        
                    </Header>
                </div>

                <Header floated="right" className="nav-container" >
                
                <List style={{display: "grid"}} className={user.isAdmin ? "admin-nav" : "nav-parent"} horizontal>
                   
                    
                    {user ?
                        <>
                        {user.isAdmin ?
                        <List.Item className="">
                            <Header as='h3'>
                                    <Link 
                                        style={path === "admin/posts/new" ? {fontWeight: "900"} : {}}
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
                        <List.Item className="">
                            <Header as='h3'>
                                
                                <Link 
                                    style={path === "plantswap/new" ? {fontWeight: "900"} : {}} 
                                    className="link" 
                                    to='/plantswap/new'
                                >
                                        {user.isAdmin ? "Post a Plant" : "Donate a Plant"}
                                </Link> 
                                
                                
                            </Header>
                        </List.Item>
                        <List.Item className="">
                            <Header as='h3'>
                                <Link 
                                    style={path === "plantswap" ? {fontWeight: "900"} : {}} 
                                    className="link" 
                                    to='/plantswap'
                                >
                                    Find a Plant
                                </Link>
                            </Header>
                        </List.Item>
                        <List.Item className="">
                            <Header as='h3'>
                                <Link 
                                    style={path === user.username ? {fontWeight: "900"} : {}}
                                    className="link" as='h3' to={`/${user.username}`}> Profile </Link>
                            </Header>
                        </List.Item>
                        <List.Item className="">
                            <Header as='h3'>
                                <Link className="link" to='/login'onClick={handleLogout}>Logout</Link>
                            </Header>
                        </List.Item>
                        </>
                        :
                        
                       ""
                        }
                        
                    
                </List>


                        
                </Header>
                
            </Grid.Column>
        </Grid.Row>
            

        </Grid>
            
            
        </Segment>
    )
}