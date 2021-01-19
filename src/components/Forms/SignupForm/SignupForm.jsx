import React from 'react';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

export default function SignupForm({handleChange, handleSubmit, handleFileInput, state, invalidForm, error}){
    return (
        <>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='green' textAlign='center'>
                <Image src='https://i.imgur.com/16jlIbf.jpeg' circular/> {state.isAdmin ? "Admin Sign Up" : "Sign Up"}    
              </Header>            
                <Form autoComplete="off"  onSubmit={handleSubmit}>
                <Segment stacked>               
                    <Form.Input                    
                      name="username"
                      placeholder="username"
                      value={state.username}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input
                      type="email"                  
                      name="email"
                      placeholder="email"
                      value={ state.email}
                      onChange={handleChange}
                      required
                    />
                    {!state.isAdmin ? "" : (
                        <Form.Input             
                      name="adminPw"
                      type="password"
                      placeholder="admin password"
                      value={ state.adminPw}
                      onChange={handleChange}
                      required
                    />)
                    }
                    <Form.Input             
                      name="password"
                      type="password"
                      placeholder="password"
                      value={ state.password}
                      onChange={handleChange}
                      required
                    />
                    <Form.Input     
                      name="passwordConf"
                      type="password"
                      placeholder="Confirm Password"
                      value={ state.passwordConf}
                      onChange={handleChange}
                      required
                    />
                    <Form.TextArea label='bio' placeholder='Tell us about your favorite plants...' name="bio" onChange={handleChange}/>
                    <Form.Field> 
                        <Form.Input
                          type="file"
                          name="photo"
                          placeholder="upload image"
                          onChange={handleFileInput}
                        />      
                    </Form.Field>
                    <Button
                      type="submit"
                      className="btn"
                      disabled={invalidForm}
                    >
                    Signup
                  </Button>
                  </Segment>
                  {error ? <ErrorMessage error={error} /> : null}
                </Form>
               
            </Grid.Column>
          </Grid>
        </>
      );   
}