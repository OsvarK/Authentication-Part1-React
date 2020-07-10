import React, { Component } from 'react';
import UserProfile from './../../Components/UserProfile';
import UserProfileSettings from './../../Components/UserProfileSettings';
import { AuthenticationContext } from './../../Contexts/AuthenticationContext';

class UserDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="floating-card-wrapper"> 
                <div className="floating-card">               
                    <UserProfile/>
                    <UserProfileSettings />
                    <div onClick={this.context.Logout} className="Profile-Settings-redlink">
                        <label>Logout</label>
                    </div>
                </div>
            </div>
        );
    }
}

UserDashboard.contextType = AuthenticationContext;
export default UserDashboard;