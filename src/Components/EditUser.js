import React, { Component } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';
import Loading from './Loading';
import { Link } from 'react-router-dom';
class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NewFirstname: null,
            NewLastname: null,
            NewUsername: null,
            NewEmail: null,
            Error: null,
            Loading: false,
            confirmBtnStatus: false,
        }
    }

    // Updates input fields and states on user input
    handleChange = (e) => {
        this.forceUpdate();
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
                if (this.isNotEmpty(this.state.NewFirstname) || this.isNotEmpty(this.state.NewLastname) || this.isNotEmpty(this.state.NewUsername) ||
                    this.isNotEmpty(this.state.NewEmail)) {
                    this.setState({ confirmBtnStatus: true });
                } else {
                    this.setState({ confirmBtnStatus: false });
                }
        });
    }

    isNotEmpty(value) {
        return !(value == null || value.length === 0);
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
        this.setState({ ValidatationPassword: null, Validate: false, Loading: false });
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
            <div className="floating-card">
                {this.state.Loading === true ? (<Loading />) : (
                    <form autocomplete="off">
                        <div className="profile-settings-wrapper">
                            <div>
                                <h1 className="section-h1">Edit User Profile</h1>
                            </div>
                            <Error />
                            <div className="Auth-card-span">
                                <label>Full name</label>
                                <div style={{ display: "flex" }}>
                                    <input className="auth-input" placeholder={this.context.UserData.Firstname} style={{ float: "left", marginRight: "1rem" }} value={this.state.NewFirstname} onChange={this.handleChange} id="NewFirstname" name="NewFirstname"></input>
                                    <input className="auth-input" placeholder={this.context.UserData.Lastname} style={{ float: "right", marginleft: "1rem" }} value={this.state.NewLastname} onChange={this.handleChange} id="NewLastname" name="NewLastname"></input>
                                </div>
                            </div>
                            <div className="Auth-card-span">
                                <label>Username</label>
                                <input className="auth-input" placeholder={this.context.UserData.Username} value={this.state.NewUsername} onChange={this.handleChange} id="NewUsername" name="NewUsername"></input>
                            </div>
                            <div className="Auth-card-span">
                                <label>E-mail</label>
                                <input className="auth-input" placeholder={this.context.UserData.Email} value={this.state.NewEmail} onChange={this.handleChange} type="Email" id="NewEmail" name="NewEmail"></input>
                            </div>
                            <div className="Auth-card-span">
                                <div className="submit-btn-wrapper">
                                    <button disabled={!this.state.confirmBtnStatus} onClick={this.handleSubmit} >Confirm Changes</button>
                                </div>
                            </div>
                            <div className="Auth-card-span link">
                                <Link className="red_link" to="/myprofile/changepassword"><label onClick={this.clearAllInputStates} >Change Password</label></Link>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

EditUser.contextType = AuthenticationContext;
export default EditUser;