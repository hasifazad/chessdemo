import { Grid, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { UserDetailsContext } from '../context/UserContext'

function ProfileSettings() {


    let inputRef = useRef()
    let { user } = useContext(UserDetailsContext)
    let [img, setImg] = useState(null)

    const onInputChange = (e) => {
        // console.log(e.target.files[0]);
        setImg(e.target.files[0])
    }

    const BASE_URL = process.env.REACT_APP_BASE_URL
    const submit = () => {
        let formdata = new FormData()
        formdata.append('avatar', img)
        formdata.append('user_id', user._id)
        console.log(img);
        axios.post(`${BASE_URL}/api/user/set-dp`, formdata,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        ).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Stack direction='row' spacing={4} sx={{ margin: 5, justifyContent: 'center' }}>
            <Grid container position='center' item xs={4}>
                <Paper sx={{ width: '100%', height: '80vh', borderRadius: 0 }} elevation={5}>
                    <Box height='150px' width='150px' style={{ backgroundColor: 'blue', margin: '20px auto', borderRadius: '50%', cursor: 'pointer' }}
                        onClick={() => { inputRef.current.click() }}>
                        <div style={{ height: '150px', padding: '65px 0', display: 'none' }}>
                            <input ref={inputRef} type='file' onChange={onInputChange} name='avatar' />
                        </div>
                    </Box>
                    <button onClick={() => { submit() }}>upload</button>
                    <Typography variant='h5' align='center'>hasif azad</Typography>
                    <Typography variant='h6' align='center'>CHESS ID</Typography>
                    <Typography variant='h6' align='center'>477</Typography>
                    <Grid style={{ padding: '0 40px' }}>
                        <Typography style={{ padding: '10px 0' }}>Email   :</Typography>
                        <Typography style={{ padding: '10px 0' }}>Mobile  :</Typography>
                        <Typography style={{ padding: '10px 0' }}>Country :</Typography>
                        {/* <Typography style={{ padding: '10px 0' }}></Typography> */}
                    </Grid>
                </Paper>
            </Grid>
            <Grid container direction='column' item xs={4}>
                <Paper elevation={0} style={{ height: '33vh', borderRadius: 0, padding: '20px', border: '1px black solid', marginBottom: '20px' }}>
                    <Grid container style={{}}>
                        <Grid xs={6} style={{ textAlign: 'center', padding: '5px' }}>Win :</Grid>
                        <Grid xs={6} style={{ textAlign: 'center', padding: '5px' }}>Lose :</Grid>
                        <Grid xs={6} style={{ textAlign: 'center', padding: '5px' }}>Draw :</Grid>
                        <Grid xs={6} style={{ textAlign: 'center', padding: '5px' }}>Point :</Grid>
                    </Grid>
                </Paper>
                <Paper elevation={0} style={{ height: '33vh', borderRadius: 0, padding: '20px', border: '1px black solid' }}>asdfgh</Paper>
            </Grid>
        </Stack >
    )
}

export default ProfileSettings