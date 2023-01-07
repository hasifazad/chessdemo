import { Grid } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Header from '../components/Header'
import LeftSideBar from '../components/LeftSideBar'
import ProfileSettings from '../components/ProfileSettings'

function Profile() {
    return (
        <>
            <Header />
            {/* <Stack direction='row'>
                <LeftSideBar />
            </Stack> */}

            <ProfileSettings />
        </>
    )
}

export default Profile