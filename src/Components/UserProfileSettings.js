import React, { Component, useContext } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';

class UserProfileSettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NewFirstname: null,
            NewLastname: null,
            NewUsername: null,
            NewEmail: null,
            NewPassword: null,
            NewRePassword: null,
            ValidatationPassword: null,
            Error: null,
            Loading: false,
            Validate: false,
            ChangePassword: false,
            confirmBtnStatus: false
        }
        this.clearAllInputStates = this.clearAllInputStates.bind(this);
    }

    

    componentDidMount() {

    }

    // Updates input fields and states on user input
    handleChange = (e) => {
        this.forceUpdate();
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
                // if in the validation phase.
                if (this.state.Validate) {
                    if (this.isNotEmpty(this.state.ValidatationPassword)) {
                        this.setState({ confirmBtnStatus: true });
                    } else {
                        this.setState({ confirmBtnStatus: false });
                    }
                }
                // if not the validation phase.
                else {
                    // if in the change password section.
                    if (this.state.ChangePassword) {
                        if (this.isNotEmpty(this.state.NewPassword) && this.isNotEmpty(this.state.NewRePassword)) {
                            this.setState({ confirmBtnStatus: true });
                        } else {
                            this.setState({ confirmBtnStatus: false });
                        }
                    }
                    // if NOT in the change password section.
                    else if (!this.state.ChangePassword) {
                        if (this.isNotEmpty(this.state.NewFirstname) || this.isNotEmpty(this.state.NewLastname) || this.isNotEmpty(this.state.NewUsername) ||
                            this.isNotEmpty(this.state.NewEmail)) {
                            this.setState({ confirmBtnStatus: true });
                        } else {
                            this.setState({ confirmBtnStatus: false });
                        }
                    }                 
                }
        });
    }

    isNotEmpty(value) {
        return !(value == null || value.length === 0);
    }

    clearAllInputStates() {
        this.setState({
            NewFirstname: null,
            NewLastname: null,
            NewUsername: null,
            NewEmail: null,
            NewPassword: null,
            NewRePassword: null,
            ValidatationPassword: null,
            confirmBtnStatus: false
        });
        if (this.state.ChangePassword) {
            this.setState({ ChangePassword: false });

        } else {
            this.setState({ ChangePassword: true });
        }
        var elements = document.getElementsByTagName("input");
        for (var ii = 0; ii < elements.length; ii++) {
            elements[ii].value = "";
        }
    }

    handleSubmit = async (e) => {
        // Loading on
        e.preventDefault();
        this.setState({ Loading: true });
        const sendData = {
            Username: this.state.NewUsername,
            Firstname: this.state.NewFirstname,
            Lastname: this.state.NewLastname,
            Email: this.state.NewEmail,
            Password: this.state.NewPassword,
            ValidatedPassword: this.state.ValidatationPassword
        }
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData)
        };
        try {
            const Response = await fetch(`/api/auth/edituser`, settings);
            if (Response.ok) {
                // Successful Post Request. update site
                window.location.href = "/auth";
            } else {
                // Failed Post Request
                const getData = await Response.json();
                this.setState({ Error: getData })
            }
        } catch (e) {
            // error handler
            console.error(e);
            this.setState({ Error: "Error with request" })
        }
        // Loading Off
        this.setState({ Loading: false });
        this.setState({ Validate: false });
    }

    render() {
        const Error = () => {
            if (this.state.Error === null) {
                return (null);
            } else {
                return (
                    <div className="Auth-error-Wrapper">
                        <p>{this.state.Error}</p>
                    </div>
                )
            }
        }

        return (
            <div className="Auth-Wrapper">    
                <div className="Auth-Card">
                    <form onSubmit={this.handleSubmit}>
                        {this.state.Validate === false ? (
                            this.state.ChangePassword === false ? (
                                <div className="ProfileSettings-Wrapper">
                                    <div style={{ padding: "5px 0 0 0 " }} className="Auth-card-span Auth-title-wrapper">
                                        <h1 style={{ color: "#707070" }} className="Auth-title">Edit User Profile</h1>
                                    </div>
                                    <Error />
                                    <div className="Auth-card-span">
                                        <label>Firstname</label>
                                        <input placeholder={this.context.UserData.Firstname} value={this.state.NewFirstname} onChange={this.handleChange} id="NewFirstname" name="NewFirstname"></input>
                                    </div>
                                    <div className="Auth-card-span">
                                        <label>Lastname</label>
                                        <input placeholder={this.context.UserData.Lastname} value={this.state.NewLastname} onChange={this.handleChange} id="NewLastname" name="NewLastname"></input>
                                    </div>
                                    <div className="Auth-card-span">
                                        <label>Username</label>
                                        <input placeholder={this.context.UserData.Username} value={this.state.NewUsername} onChange={this.handleChange} id="NewUsername" name="NewUsername"></input>
                                    </div>
                                    <div className="Auth-card-span">
                                        <label>E-mail</label>
                                        <input placeholder={this.context.UserData.Email} value={this.state.NewEmail} onChange={this.handleChange} type="Email" id="NewEmail" name="NewEmail"></input>
                                    </div>
                                    <div className="Auth-card-span Auth-submit-section">
                                        <div className="submit-btn-wrapper">
                                            <button disabled={!this.state.confirmBtnStatus} onClick={() => this.setState({ Validate: true, confirmBtnStatus: false })} >Confirm change</button>
                                        </div>
                                    </div>
                                    <div onClick={this.clearAllInputStates} className="Profile-Settings-ChangePasswordButton">
                                        <label>Change password</label>
                                    </div>
                                </div>
                            ) : (                                    
                                    <div className="ProfileSettings-Wrapper">
                                        <div style={{ padding: "5px 0 0 0 " }} className="Auth-card-span Auth-title-wrapper">
                                            <h1 style={{ color: "#707070" }} className="Auth-title">Change Password</h1>
                                        </div>
                                        <Error />
                                        <div className="Auth-card-span">
                                            <label>New Password</label>
                                            <input value={this.state.NewPassword} onChange={this.handleChange} id="NewPassword" name="NewPassword"></input>
                                        </div>
                                        <div className="Auth-card-span">
                                            <label>Re-Enter New Password</label>
                                            <input value={this.state.NewRePassword} onChange={this.handleChange} id="NewRePassword" name="NewRePassword"></input>
                                        </div>
                                        <div className="Auth-card-span Auth-submit-section">
                                            <div className="submit-btn-wrapper">
                                                <button disabled={!this.state.confirmBtnStatus} onClick={() => this.setState({ Validate: true, confirmBtnStatus: false })} >Confirm change</button>
                                            </div>
                                        </div>
                                        <div onClick={this.clearAllInputStates} className="Profile-Settings-ChangePasswordButton">
                                            <label>Back</label>
                                        </div>
                                    </div>
                                )      
                        ): (
                                <div className = "ProfileSettings-Wrapper">
                                <div className = "Auth-card-span Auth-submit-section">
                                    <div className = "Auth-card-span Auth-title-wrapper">
                                        <h1 style={{ color: "#c42b2b" }} className = "Auth-title">Validation</h1>
                                    </div>
                                    <div className="Auth-card-span">
                                        <label>Confirm your changes with your password</label>
                                        <input value={this.state.ValidatationPassword} onChange={this.handleChange} type="Password" id="ValidatationPassword" name="ValidatationPassword"></input>
                                    </div>
                                    <div className="submit-btn-wrapper">
                                            <button disabled={!this.state.confirmBtnStatus} type="submit">Confirm change</button>
                                    </div>
                                        <div onClick={() => this.setState({ ValidatationPassword: null, Validate: false, confirmBtnStatus: true})} className="Profile-Settings-ChangePasswordButton">
                                        <label>Back</label>
                                    </div>
                                </div>
                            </div>
                            )}                            
                    </form>
                </div>
            </div>
        );
    }
}

UserProfileSettingsPage.contextType = AuthenticationContext;
export default UserProfileSettingsPage;