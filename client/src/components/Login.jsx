import React, { useState } from 'react'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import GoogleSignup from './GoogleSignup'
import axios from 'axios'
import { useContext } from 'react'
import { UserDetailsContext } from '../context/UserContext'
import { Link } from 'react-router-dom'

function Login() {
    const paperStyle = { padding: '30px 20px', width: '350px', margin: '50px auto' }
    const textStyle = { margin: '10px 0', backgroundColor: 'white' }
    const span = { color: 'red' }
    const errStyle = { color: 'red', margin: 0 }


    let { setUser } = useContext(UserDetailsContext)

    let [login, setLogin] = useState(null)
    let { register, handleSubmit, formState: { errors } } = useForm()

    const BASE_URL = process.env.REACT_APP_BASE_URL
    const onsubmit = (data) => {
        axios.post(`${BASE_URL}/api/user/login`, data).then((response) => {
            console.log(response.data.token);
            setUser(response.data.user)
            localStorage.setItem('chesstoken', response.data.token)
            setLogin(null)
        }).catch((error) => {
            console.log(error);
            setLogin(error.response.data)
        })
    }

    return (
        <Grid item xs={4}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar />
                    <Typography variant='h5'>LOG IN</Typography>
                    <Typography variant='caption'>Please fill this form to create an account</Typography>
                    <p style={errStyle}>{login ? login : null}</p>
                </Grid>
                <Box>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <TextField style={textStyle} type='text' fullWidth label='Email' size='small' variant='filled' name='email'
                            {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
                        {errors.email && errors.email.type === "required" && (<span style={span}>This field is required</span>)}
                        {errors.email && errors.email.type === "pattern" && (<span style={span}>Email must be valid</span>)}

                        <TextField style={textStyle} type='password' fullWidth label='Password' size='small' variant='filled' name='password'
                            {...register("password", { required: true })} />
                        {/* pattern: /^[A-Za-z]\w{7,14}$/ */}
                        {errors.password && errors.password.type === "required" && (<span style={span}>This field is required</span>)}
                        {/* {errors.password && errors.password.type === "pattern" && (<span style={span}>Enter a strong password</span>)} */}
                        <Button fullWidth variant='contained' color='primary' type='submit'>Log in</Button>
                        <Typography align='center' padding={1}>OR</Typography>
                        <GoogleSignup />
                    </form>
                    <Link to='/'>chat</Link>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Login