import React, { Component } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';
import Loading from './Loading';
import { Link } from 'react-router-dom';
class ChangeUserPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentPassword: "",
            NewPassword: "",
            NewRePassword: "",
            Error: null,
            Loading: false,
            confirmBtnStatus: false,
            showPassword: "password",
            pasCheck: {
                pasHaveLowercase: "red",
                pasHaveUppsercase: "red",
                pasHasNumber: "red",
                pasHasSymbol: "red",
                pasHasLenght: "red",
            }
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
                // Validate password
                var pas = this.state.NewPassword;
                var pasHaveLowercase = (/[a-z]/.test(pas));
                var pasHaveUppsercase = (/[A-Z]/.test(pas));
                var pasHasNumber = (/\d/.test(pas));
                var pasHasSymbol = (/[ `!@#$%^&*()_/+\-=\][{};':"\\|,.<>?~]/.test(pas));
                var pasHasLenght = (pas.length >= 8);
                this.setState({
                    pasCheck: {
                        pasHaveLowercase: (pasHaveLowercase ? 'green' : 'red'),
                        pasHaveUppsercase: (pasHaveUppsercase ? 'green' : 'red'),
                        pasHasNumber: (pasHasNumber ? 'green' : 'red'),
                        pasHasSymbol: (pasHasSymbol ? 'green' : 'red'),
                        pasHasLenght: (pasHasLenght ? 'green' : 'red'),
                    }
                })
                // Validate that all fields are NOT empty
                if (pasHaveLowercase && pasHaveUppsercase &&
                    pasHasNumber && pasHasSymbol && pasHasLenght &&
                    this.state.CurrentPassword !== "" && this.state.NewPassword !== "" && this.state.NewRePassword !== "") {
                    this.setState({ confirmBtnStatus: true });
                } else {
                    this.setState({ confirmBtnStatus: false });
                }
        });
    }

    isNotEmpty(value) {
        return !(value == null || value.length === 0);
    }

    clearAllInputStates() {
        this.setState({
            CurrentPassword: null,
            NewPassword: null,
            NewRePassword: null,
            confirmBtnStatus: false,
            pasCheck: {
                pasHaveLowercase: "red",
                pasHaveUppsercase: "red",
                pasHasNumber: "red",
                pasHasSymbol: "red",
                pasHasLenght: "red",
            }
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

    //handleSubmit = async (e) => {
    //    // Loading on
    //    e.preventDefault();
    //    this.setState({ Loading: true });
    //    const sendData = {
    //        Username: this.state.NewUsername,
    //        Firstname: this.state.NewFirstname,
    //        Lastname: this.state.NewLastname,
    //        Email: this.state.NewEmail,
    //        Password: this.state.NewPassword,
    //        ValidatedPassword: this.state.ValidatationPassword
    //    }
    //    const settings = {
    //        method: 'POST',
    //        headers: {
    //            Accept: 'application/json',
    //            'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify(sendData)
    //    };
    //    try {
    //        const Response = await fetch(`/api/auth/edituser`, settings);
    //        if (Response.ok) {
    //            // Successful Post Request. update site
    //            window.location.href = "/auth";
    //        } else {
    //            // Failed Post Request
    //            const getData = await Response.json();
    //            this.setState({ Error: getData })
    //        }
    //    } catch (e) {
    //        // error handler
    //        console.error(e);
    //        this.setState({ Error: "Error with request" })
    //    }
    //    // Loading Off
    //    this.setState({ ValidatationPassword: null, Validate: false, Loading: false });
    //}

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
                    <div className="profile-settings-wrapper">
                        <div>
                            <h1 className="section-h1">Change Password</h1>
                        </div>
                        {this.context.isUsingAlternativeLogin === true ? (<div className="disabled-change-password"><label>Your account is linked to {this.context.AlternativeLoginProvider}</label></div>) : (
                            <div>
                                <Error />
                                <div className="Auth-card-span">
                                    <label>Current Password</label>
                                    <div style={{ display: "flex" }}>
                                        <input className="auth-input" style={{ borderRadius: "4px 0 0 4px" }} value={this.state.CurrentPassword} onChange={this.handleChange} id="CurrentPassword" name="CurrentPassword" type={this.state.showPassword}></input>
                                        <i onMouseLeave={() => this.setState({ showPassword: "Password" })} onMouseEnter={() => this.setState({ showPassword: "Text" })} className="fa fa-eye" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div style={{ padding: "1rem 0" }} className="Auth-card-span">
                                    <label>In order to protect your account, make sure your password:</label>
                                    <ul className="password-checker-wrapper">
                                        <li className={this.state.pasCheck.pasHaveLowercase}>Contains at least one lowercase.</li>
                                        <li className={this.state.pasCheck.pasHaveUppsercase}> Contains at least one uppsercase.</li>
                                        <li className={this.state.pasCheck.pasHasSymbol}>Contains at least one symbol.</li>
                                        <li className={this.state.pasCheck.pasHasNumber}>Contains at least one digit.</li>
                                        <li className={this.state.pasCheck.pasHasLenght}>Is at least 8 characters long.</li>
                                    </ul>
                                </div>

                                <div className="Auth-card-span">
                                    <label>New Password</label>
                                    <div style={{ display: "flex" }}>
                                        <input className="auth-input" style={{ borderRadius: "4px 0 0 4px" }} value={this.state.NewPassword} onChange={this.handleChange} id="NewPassword" name="NewPassword" type={this.state.showPassword}></input>
                                        <i onMouseLeave={() => this.setState({ showPassword: "Password" })} onMouseEnter={() => this.setState({ showPassword: "Text" })} className="fa fa-eye" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="Auth-card-span">
                                    <label>Re-enter New Password</label>
                                    <div style={{ display: "flex" }}>
                                        <input className="auth-input" style={{ borderRadius: "4px 0 0 4px" }} value={this.state.NewRePassword} onChange={this.handleChange} id="NewRePassword" name="NewRePassword" type={this.state.showPassword}></input>
                                        <i onMouseLeave={() => this.setState({ showPassword: "Password" })} onMouseEnter={() => this.setState({ showPassword: "Text" })} className="fa fa-eye" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="Auth-card-span">
                                    <div className="submit-btn-wrapper">
                                        <button disabled={!this.state.confirmBtnStatus} >Confirm Changes</button>
                                    </div>
                                </div>
                            </div>)}
                        <div className="Auth-card-span link">
                            <Link className="black_link" to="/myprofile"><label onClick={this.clearAllInputStates} >Back</label></Link>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

ChangeUserPassword.contextType = AuthenticationContext;
export default ChangeUserPassword;