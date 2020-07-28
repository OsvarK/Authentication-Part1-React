import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './../../Components/UserProfile';
import EditUser from './../../Components/EditUser';
import ChangeUserPassword from './../../Components/ChangeUserPassword';
import { AuthenticationContext } from './../../Contexts/AuthenticationContext';

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePasswordMenu: false,

            }
    }


    render() {
        return (
            <div className="floating-card-wrapper"> 
                <div>               
                    <UserProfile />
                    <div style={{ marginTop: "2rem" }}>
                        <Router>
                            <Switch>
                                <Route path="/myprofile/edit" component={() => <EditUser />} />
                                <Route path="/myprofile/changepassword" component={() => <ChangeUserPassword />} />
                                <Route path="/" component={() => <EditUser />} />
                            </Switch>
                        </Router>
                    </div>
                    <div style={{ display: "flex", margin: "2rem 0"}} className="floating-card">
                        <div onClick={this.context.DeleteAccount} style={{ textAlign: "center", width: "100%" }} className="link red_link">
                            <label>Delete Account</label>
                        </div>
                        <div onClick={this.context.Logout} style={{ textAlign: "center", width: "100%"}} className="link red_link">
                            <label>Logout</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserDashboard.contextType = AuthenticationContext;
export default UserDashboard;