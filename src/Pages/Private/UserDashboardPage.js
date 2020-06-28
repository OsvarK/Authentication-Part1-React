import React, { Component } from 'react';
import UserProfile from './../../Components/UserProfile';
import UserProfileSettings from './../../Components/UserProfileSettings';
import './../../CSS/UserDashboardPage.css'


class UserDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="floating-card-wrapper floating-card">
                <div>
                    <h5 className="userdash-account-login-header" >You are currently logged in as:</h5>
                    <UserProfile/>
                    <UserProfileSettings/>
                </div>
            </div>
        );
    }
}

export default UserDashboard;