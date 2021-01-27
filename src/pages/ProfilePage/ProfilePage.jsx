import React, { useState, useEffect } from 'react';
import { Grid} from 'semantic-ui-react'
import userService from '../../utils/userService';
import ProfileSection from '../../components/ProfileSection/ProfileSection';
import PlantFeed from '../../components/PlantFeed/PlantFeed';
import Header from '../../components/Header/Header'
import { useLocation } from 'react-router-dom';
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'
import * as plantPostAPI from '../../utils/plantPostService'

export default function ProfilePage({ user, handleLogout, setIsAdminPost, isAdminPost }) {

    const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const location = useLocation()
    console.log(location, "location")

    

    async function getProfile() {
        
        try {

            const username = location.pathname.substring(1)
            // location.pathname returns /jimbo so we need to cut off the / using the js method substring
            // This gets the username from the url! 
            console.log(username, "<--------------username!!!")
            const data = await userService.getProfile(username);
            console.log(data)
            setLoading(() => false)
            setPosts(() => [...data.posts])
            setProfileUser(() => data.user)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    async function deletePost(postId) {
        try {
            const data = await plantPostAPI.removePost(postId);
            getProfile();
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        if (location.pathname.substring(1) !== "plantswap")
        getProfile()

        // triggers the correct delete function in the delete confirmation modal
        setIsAdminPost(false)
    }, [])



    return (

        <>
            { loading ?
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
                
                        <Grid.Column style={{ maxWidth: 450}}>
                            
                                <LoadingMsg/>
                         
                        </Grid.Column>
                 
                </Grid>
                :
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header user={user} handleLogout={handleLogout}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ProfileSection user={profileUser} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 1050 }}>
                            <PlantFeed isProfile={true} posts={posts} isAdminPost={isAdminPost} user={user} deletePost={deletePost} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            }
        </>
    )
}