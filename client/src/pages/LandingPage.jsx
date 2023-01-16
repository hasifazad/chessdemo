import {Typography } from '@mui/material'
import React from 'react'
import HeaderOne from '../components/HeaderOne/HeaderOne'
import './LandingPage.css'


function LandingPage() {

    return (
        <div className='landingpage'>
            <div className='lp-box'>
                <HeaderOne/>
                <div className='lp-box2'>
                    <div>
                        <img src={require('../images/p1.gif')} />
                    </div>
                    <div className='image-2'>
                        <img src={require('../images/p2.png')} />
                    </div>
                </div>
                <div className='lp-about'>
                    <Typography variant='h4' align='center'>ABOUT CHESS</Typography>
                    <Typography variant='h6'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default LandingPage