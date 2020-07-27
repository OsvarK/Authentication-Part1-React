import React from 'react';
import GoogleLogin from 'react-google-login';

function LoginAlternatives(props) {
    const responseGoogle = async (response) => {
        const sendData = response.tokenId;
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData)
        };
        try {
            const Response = await fetch(`/api/auth/authgoogle`, settings);
            if (Response.ok) {
                // Successful Post Request. update site
                window.location.href = "/auth";
            } else {
                // Failed Post Request
                const getData = await Response.json();
                this.setState({ Error: getData })
            }
        } catch (e) {
            // error handler
            console.error(e);
        }
    }

    const responseGoogleFail = async () => {
        props.error("Authentication from google failed.");
    }

    const GoogleSvg = () => {
        return (
            <svg viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
            </svg>
            );
    }

    return (
        <div className="alternative-login-wrapper">
            <GoogleLogin
                render={renderProps => (
                    <div className="alternative-login-button-wrapper">
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <GoogleSvg />
                            <label>Sign in using Google</label>
                        </button>
                    </div>
                )}
                clientId="187244628449-lv1fanismah4p98iarsaut3hfvsu1us9.apps.googleusercontent.com"
                onSuccess={() => responseGoogle}
                onFailure={() => responseGoogleFail}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}



export default LoginAlternatives;
