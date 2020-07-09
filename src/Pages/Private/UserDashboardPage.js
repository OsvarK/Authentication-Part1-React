import React, { Component } from 'react';
import UserProfile from './../../Components/UserProfile';
import UserProfileSettings from './../../Components/UserProfileSettings';


class UserDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="floating-card-wrapper">
                <div className="floating-card">                    
                    <UserProfile/>
                    <UserProfileSettings/>
                </div>
            </div>
        );
    }
}

export default UserDashboard;