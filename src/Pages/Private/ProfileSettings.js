import React, { Component } from 'react';
import '../../CSS/ProfileSettings.css';

class ProfileSettings extends Component {
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
            Validate: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // Loading on
        this.props.LoadingOn();
        const sendData = {
            NewUsername: this.state.NewUsername,
            NewFirstname: this.state.NewFirstname,
            NewLastname: this.state.NewLastname,
            NewEmail: this.state.NewEmail,
            NewPassword: this.state.NewPassword
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
            const Response = await fetch(`/api/auth/signup`, settings);
            if (Response.ok) {
                // Successful Post Request, Redirect to login
                window.location.href = "/login";
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
        this.props.LoadingOff();
    } // NOT DEVELOPED YET

    componentDidMount() {
     //   this.props.LoadingOn(); 
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
        const AccountSettingsForm = () => {
            return (<div>
                <div className="Auth-card-span Auth-title-wrapper">
                    <label className="Auth-title">Account settings</label>
                </div>
                <Error />
                <div className="Auth-card-span">
                    <label>Firstname</label>
                    <input value={this.state.NewFirstname} onChange={this.handleChange} id="NewFirstname" name="NewFirstname" className="Signup-input"></input>
                </div>
                <div className="Auth-card-span">
                    <label>Lastname</label>
                    <input value={this.state.NewLastname} onChange={this.handleChange} id="NewLastname" name="NewLastname" className="Signup-input"></input>
                </div>
                <div className="Auth-card-span">
                    <label>Username</label>
                    <input value={this.state.NewUsername} onChange={this.handleChange} id="NewUsername" name="NewUsername" className="Signup-input"></input>
                </div>
                <div className="Auth-card-span">
                    <label>E-mail</label>
                    <input value={this.state.NewEmail} onChange={this.handleChange} type="Email" id="NewEmail" name="NewEmail" className="Signup-input"></input>
                </div>
                <div className="Auth-card-span Auth-title-wrapper">
                    <label className="Auth-title">Change password</label>
                </div>
                <div className="Auth-card-span">
                    <label>New Password</label>
                    <input value={this.state.Email} onChange={this.handleChange} type="Email" id="Email" name="Email" className="Signup-input"></input>
                </div>
                <div className="Auth-card-span">
                    <label>Re- New Password</label>
                    <input value={this.state.Email} onChange={this.handleChange} type="Email" id="Email" name="Email" className="Signup-input"></input>
                </div>
                <div className="Auth-card-span Auth-submit-section">
                    <div className="Auth-submit-btn-wrapper">
                        <button onClick={() => this.setState({Validate: true})} >Confirm change</button>
                    </div>
                </div>
            </div>);
        }
        const ValidateForm = () => {

            return (<div>
                <div className="Auth-card-span Auth-submit-section">
                    <div className="Auth-card-span Auth-title-wrapper">
                        <label className="Auth-title">Validation</label>
                    </div>
                    <div className="Auth-card-span">
                        <label>Confirm your changes with your password</label>
                        <input value={this.state.ValidatationPassword} onChange={this.handleChange} type="Password" id="ValidatationPassword" name="ValidatationPassword" className="Signup-input"></input>
                    </div>
                    <div className="Auth-submit-btn-wrapper">
                        <button type="submit">Confirm change</button>
                    </div>
                </div>
            </div>);
        }

        return (           
            <div className="Auth-Wrapper">
                <div className="Auth-Container">
                    <div className="Auth-Card">
                        <form onSubmit={this.handleSubmit}>
                            {this.state.Validate === false ? (<AccountSettingsForm />) : (<ValidateForm />)}                            
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileSettings;