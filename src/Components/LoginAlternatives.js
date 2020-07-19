import React from 'react';
import GoogleLogin from 'react-google-login';

function LoginAlternatives() {

    const responseGoogle = (response) => {
        console.log(response.tokenId);
    }

    return (
        <div>
            <GoogleLogin
                clientId="187244628449-lv1fanismah4p98iarsaut3hfvsu1us9.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}



export default LoginAlternatives;
