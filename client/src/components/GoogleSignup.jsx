
import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode';

function GoogleSignup() {

    const handleCallbackResponse = (res) => {
        let a = jwtDecode(res.credential)
        console.log(a);

    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "272477328062-bjr4gqpbg7ddf1ivf6o4gfffb18arcp1.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        window.google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: "outline", size: 'large', width:'350' }
        )
        window.google.accounts.id.prompt()
    }, [])



    return (
        <div>
            <div id='signInDiv'></div>
        </div>
    )
}

export default GoogleSignup