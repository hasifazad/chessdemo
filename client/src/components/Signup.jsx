import React, { useState } from 'react'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { margin } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const paperStyle = { padding: '30px 20px', width: '350px', margin: '50px auto' }
    const textStyle = { margin: '10px 0', backgroundColor: 'white' }
    const errStyle = { color: 'red', margin: 0 }

    const navigate = useNavigate()

    const BASE_URL = process.env.REACT_APP_BASE_URL

    let [signup, setSignup] = useState(null)
    let { register, handleSubmit, formState: { errors } } = useForm()

    const onsubmit = (data) => {
        axios.post(`${BASE_URL}/api/user/signup`, data).then((response) => {
            navigate('/login')
            setSignup(null)
        }).catch((err) => {
            setSignup(err.response.data)
        })
    }

    return (
        <Grid item xs={4}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar />
                    <Typography variant='h5'>SIGN UP</Typography>
                    <Typography variant='caption'>Please fill this form to create an account</Typography>
                    <p style={errStyle}>{signup ? signup : null}</p>
                </Grid>
                <Box>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <TextField style={textStyle} type='text' fullWidth label='Username' size='small' variant='filled' name='username'
                            {...register("username", { required: true, minLength: 3 })} />
                        {errors.username && errors.username.type === "required" && (<span style={errStyle}>This field is required</span>)}
                        {errors.username && errors.username.type === "minLength" && (<span style={errStyle}>Min 3 characters</span>)}

                        <TextField style={textStyle} type='text' fullWidth label='Email' size='small' variant='filled' name='email'
                            {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
                        {errors.email && errors.email.type === "required" && (<span style={errStyle}>This field is required</span>)}
                        {errors.email && errors.email.type === "pattern" && (<span style={errStyle}>Email must be valid</span>)}

                        <TextField style={textStyle} type='text' fullWidth label='Mobile' size='small' variant='filled' name='mobile'
                            {...register("mobile", { required: true, minLength: 10, maxLength: 10 })} />
                        {errors.mobile && errors.mobile.type === "required" && (<span style={errStyle}>This field is required</span>)}
                        {errors.mobile && errors.mobile.type === "minLength" && (<span style={errStyle}>Mobile must be valid</span>)}

                        <TextField style={textStyle} type='password' fullWidth label='Password' size='small' variant='filled' name='password'
                            {...register("password", { required: true })} />
                        {/* pattern: /^[A-Za-z]\w{7,14}$/ */}
                        {errors.password && errors.password.type === "required" && (<span style={errStyle}>This field is required</span>)}
                        {/* {errors.password && errors.password.type === "pattern" && (<span style={errStyle}>Enter a strong password</span>)} */}
                        <Button fullWidth variant='contained' color='primary' type='submit'>Sign Up</Button>

                    </form>
                    <div style={{ display: 'flex', margin: '5px', justifyContent: 'space-between' }}>
                        <p style={{ margin: '0' }}>Already have account?</p>
                        <Link to='/login'>Login</Link>
                    </div>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Signup