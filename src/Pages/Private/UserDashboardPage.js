import React, { Component } from 'react';
import UserProfile from './../../Components/UserProfile';
import UserProfileSettings from './../../Components/UserProfileSettings';


class UserDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="floating-card-wrapper floating-card">
                <div>
                    <h5 style={{ margin: "0 0 7px 0", color: "#707070"}}>You are currently logged in as:</h5>
                    <UserProfile showChangeImageLink={true}/>
                    <UserProfileSettings/>
                </div>
            </div>
        );
    }
}

export default UserDashboard;