import React, { useContext } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';

const UserProfile = (props) => {

    // Get the context
    const Auth = useContext(AuthenticationContext);

    return (
        <div className="user-profile floating-card">
            <div className="user-profile-content user-profile-content--left">
                <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></img>
            </div>
            <div className="User-profile-content user-profile-content--right">
                <label>{Auth.UserData.Firstname} {Auth.UserData.Lastname}</label>
                <label>Email: {Auth.UserData.Email}</label>
                <label>Username: {Auth.UserData.Username}</label>
                {props.showChangeImageLink === true ? (<label id="link">Change image</label>): (null)}
            </div>
        </div>
    );
};

export default UserProfile;