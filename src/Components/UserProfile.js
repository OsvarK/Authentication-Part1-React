import React, { useContext } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';
import './../CSS/UserProfile.css';

const UserProfile = () => {

    // Get the context
    const Auth = useContext(AuthenticationContext);

    return (
        <div className="UserProfile-Wrapper floating-card">
            <div className="UserProfile-Wrapper-container c1">
                <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"></img>
            </div>
            <div className="UserProfile-Wrapper-container c2">
                <label>{Auth.UserData.Firstname} {Auth.UserData.Lastname}</label>
                <label>Email: {Auth.UserData.Email}</label>
                <label>Username: {Auth.UserData.Username}</label>
                <label>Change image</label>
            </div>
        </div>
    );
};

export default UserProfile;