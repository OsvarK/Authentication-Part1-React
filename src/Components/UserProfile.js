import React, { useContext } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';

const UserProfile = (props) => {

    // Get the context
    const Auth = useContext(AuthenticationContext);

    return (
        <div>
            <h5 style={{ margin: "0 0 7px 0", color: "#707070" }}>You are currently logged in as:</h5>
            <div className="user-profile floating-card">
                <div className="User-profile-content">
                    <label>{Auth.UserData.Firstname} {Auth.UserData.Lastname}</label>
                    <label>Email: {Auth.UserData.Email}</label>
                    <label>Username: {Auth.UserData.Username}</label>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;