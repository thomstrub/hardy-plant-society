import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'
import * as plantPostService from '../../utils/plantPostService'



import { useLocation } from 'react-router-dom';

export default function PlantDetailPage({ user, handleLogout }) {

    const [post, setPost] = useState({})
    // const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const location = useLocation()
    console.log(location.pathname.substring(1))

    async function getShow() {

        try {

            // return just the last part of pathname, which should be the id # for the post
            const plantDetail = location.pathname.substring(10)
          
            console.log(plantDetail)
            const data = await plantPostService.getOne(plantDetail);
            console.log(data, "<--------- data from getShow")
            setLoading(() => false)
            setPost(data.post)
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
                            {/* <PageHeader user={user} handleLogout={handleLogout} /> */}
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
