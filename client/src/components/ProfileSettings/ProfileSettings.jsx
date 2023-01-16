import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import './ProfileSettings.css'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserDetailsContext } from '../../context/UserContext'
import ProfileEdit from './ProfileEdit'
import { useNavigate } from 'react-router-dom'


function ProfileSettings() {

    let blankPic = require('../../images/blankprofilepic.png')
    let a = 'https://chess-user-images.s3.ap-south-1.amazonaws.com'
    // let [state, setState] = useState('')
    // useEffect(() => {
    //     var params = { Bucket: 'xxx-xx-xxx', Key: '1.jpg' };
    //     var promise = s3.getSignedUrlPromise('getObject', params);
    //     promise.then(function (url) {
    //         res.send(url)
    //     }, function (err) { console.log(err) });
    //     Storage.get('https://chess-user-images.s3.ap-south-1.amazonaws.com/63bce8a840b60dec12b9869a7.jpg').then((data) => {
    //         console.log(data);
    //         setState(data)
    //     })
    // }, [])
    let inputRef = useRef()
    let { user } = useContext(UserDetailsContext)
    let [img, setImg] = useState(null)
    let [userDetails, setUserDetails] = useState({})

    const onInputChange = (e) => {
        // console.log(e.target.files[0]);
        setImg(e.target.files[0])
    }

    const BASE_URL = process.env.REACT_APP_BASE_URL
    let navigate = useNavigate()
    const submit = () => {
        let formdata = new FormData()
        formdata.append('avatar', img)
        formdata.append('user_id', user._id)
        console.log(img);
        axios.post(`${BASE_URL}/api/user/set-dp`, formdata,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        ).then((response) => {
            console.log(response);
            setImg(null)
            navigate('/profile')
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/get-user-profile/${user._id}`).then((response) => {
            console.log('kkkkkkkkkkkkkkkk', response.data);
            setUserDetails(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])



    return (

        <div className='profile'>
            <div className='profile-box'>
                <div className='profile-pic' onClick={() => { inputRef.current.click() }}>
                    <img className='pic' height='200px' width='200px'
                        src={user.image ? `${a}/${user._id + user.image}` : blankPic} alt='' type='file'></img>
                    <div style={{ display: 'none' }} >
                        <input type='file' onChange={onInputChange} ref={inputRef} />

                    </div>
                </div>
                {img ? <Button variant='outlined' onClick={() => { submit() }}>upload</Button> : null}


                <div className='profile-details'>
                    <div style={{ margin: "10px 50px" }}>
                        <Typography align='center' variant='h4'>{userDetails?.username}</Typography>
                        <Typography align='center' variant='h5'>CH44786</Typography>
                        <Typography align='center' variant='h5'>Rank : 5</Typography>
                        <div style={{ marginTop: '20px' }}>
                            <Typography>Email &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{userDetails?.email}</Typography>
                            <Typography>Country : &nbsp;Winterfell</Typography>
                            <Typography>Win &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{userDetails?.ranking?.ranking.win}</Typography>
                            <Typography>Lose &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{userDetails?.ranking?.ranking.lose}</Typography>
                            <Typography>Draw &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{userDetails?.ranking?.ranking.draw}</Typography>
                            <Typography>Points &nbsp;&nbsp;: &nbsp;{userDetails?.ranking?.ranking.point}</Typography>
                        </div>
                    </div>
                </div>
                <ProfileEdit />

            </div>
            {/* <div className='profile-box2'>
                    <div className='profile-box21'>

                    </div>
                    <div className='profile-box22'>
                    </div>

                </div> */}
        </div>

    )



    {/* <Box height='150px' width='150px' style={{ backgroundColor: 'blue', margin: '20px auto', borderRadius: '50%', cursor: 'pointer' }}
                        onClick={() => { inputRef.current.click() }}>
                        <div style={{ height: '150px', padding: '65px 0', display: 'none' }}>
                            <input ref={inputRef} type='file' onChange={onInputChange} name='avatar' />
                        </div>
                    </Box>
                    <button onClick={() => { submit() }}>upload</button> */}
}

export default ProfileSettings