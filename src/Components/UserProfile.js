import React, { useContext } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';
import './../CSS/UserProfile.css';

const UserProfile = () => {

    // Get the context
    const Auth = useContext(AuthenticationContext);

    return (
        <div className="UserProfile-Wrapper floating-card">            
            <label>{Auth.UserData.Firstname} {Auth.UserData.Lastname}</label>
            <label>{Auth.UserData.Email}</label>
            <label>{Auth.UserData.Username}</label>
            <label>Admin status: {Auth.UserData.AccountStatus}</label>
        </div>
    );
};

export default UserProfile;