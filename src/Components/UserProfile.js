import React, { useContext } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';
const UserProfile = (props) => {

    // Get the context
    const Auth = useContext(AuthenticationContext);
    var loginProvider = Auth.isUsingAlternativeLogin;
    if (loginProvider === true) {
        loginProvider = Auth.AlternativeLoginProvider;
    } else {
        loginProvider = "false";
    }
    var isAdmin = (Auth.UserData.IsAdmin).toString();

    return (
        <div className="floating-card">
            <div className="account-information-card">
                <h1 className="section-h1" >Account Information</h1>
                <div className="account-informatio-content">
                    <div className="user-info">
                        <label>Fullname:</label>
                        <label>{Auth.UserData.Firstname} {Auth.UserData.Lastname}</label>
                    </div>
                    <div className="user-info">
                        <label>Username:</label>
                        <label>{Auth.UserData.Username}</label>
                    </div>                  
                    <div className="user-info">
                        <label>E-mail:</label>
                        <label>{Auth.UserData.Email}</label>
                    </div>
                    <div className="user-info">
                        <label>Linked Account:</label>
                        <label>{loginProvider}</label>
                    </div>          
                    <div className="user-info">
                        <label>Is Admin:</label>
                        <label>{isAdmin}</label>
                    </div>          
                </div>
            </div>
        </div>
    );
};

export default UserProfile;