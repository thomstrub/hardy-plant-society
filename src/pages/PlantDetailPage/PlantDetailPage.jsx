import React, { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import LoadingMsg from '../../components/LoadingMsg/LoadingMsg'
import * as plantPostService from '../../utils/plantPostService'

import PlantShowCard from '../../components/PlantShow/PlantShowCard'



import { useLocation } from 'react-router-dom';
import PlantDetailsCard from '../../components/PlantShow/PlantDetailsCard';

export default function PlantDetailPage({ user, handleLogout }) {

    const [post, setPost] = useState({})
    // const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const location = useLocation()
    console.log(location.pathname.substring(1))

    async function getShow() {

        try {

            // *HARDCODED* substring(10) returns the pathname after /plantswap specifically.
            const plantDetail = location.pathname.substring(10)
          
            console.log(plantDetail)
            const data = await plantPostService.getOne(plantDetail);
            console.log(data, "<--------- data from getShow")
            
            setPost(data.post)
            setLoading(() => false)
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
                
                        <Grid.Column style={{ maxWidth: 750}}>
                            
                                <LoadingMsg />
                         
                        </Grid.Column>
                 
                </Grid>
                :
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column>
                            Header
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{maxWidth: 800}}>
                            <PlantShowCard post={post}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            }
        </>
    )
}
