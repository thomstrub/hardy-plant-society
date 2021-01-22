import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'
import * as plantPostService from '../../utils/plantPostService'



import { useLocation } from 'react-router-dom';

export default function PlantDetailPage({ user, handleLogout }) {

    const [posts, setPosts] = useState([])
    // const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const location = useLocation()
    console.log(location)

    async function getShow() {

        try {

            const plantDetail = location.pathname.substring(1)
            // location.pathname returns /jimbo so we need to cut off the / using the js method substring
            // This gets the username from the url! 
            console.log(plantDetail)
            const data = await plantPostService.getOne(plantDetail);
            console.log(data)
            setLoading(() => false)
            setPosts(() => [...data.posts])
            setProfileUser(() => data.user)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }


    


    useEffect(() => {
        getShow()

    }, [])



    return (

        <>
            { loading ?
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
                
                        <Grid.Column style={{ maxWidth: 450}}>
                            
                                <LoadingMsg />
                         
                        </Grid.Column>
                 
                </Grid>
                :
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader user={user} handleLogout={handleLogout} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            This is a detail post
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                            This is the detail post body.
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            }
        </>
    )
}
