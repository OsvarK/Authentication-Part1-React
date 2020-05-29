import React, { Component } from 'react';
import '../../CSS/Auth.css';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Firstname: null,
            Lastname: null,
            Username: null,
            Email: null,
            Password: null,
            RePassword: null,
            Error: null,
        }
    }

    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = async(e) => {
        e.preventDefault();
        // Loading on
        this.props.LoadingOn();
        const sendData = {
            Username: this.state.Username,
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            Email: this.state.Email,
            Password: this.state.Password
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
                this.setState({ Error: getData})
            }
        } catch (e) {
            // error handler
            console.error(e);
            this.setState({ Error: "Error with request" })
        }    

        // Loading Off
        this.props.LoadingOff();
    }

    render() {
        //Display error msg
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
            <div>
                <div className="Auth-Wrapper">
                    <div className="Auth-Container">
                        <div className="Auth-Card">                          
                            <form onSubmit={this.handleSubmit}>
                                <div className="Auth-card-span Auth-title-wrapper">
                                    <label className="Auth-title">Set up your account</label>
                                </div>
                                <Error />
                                <div className="Auth-card-span">
                                    <label>Firstname</label>
                                    <input value={this.state.Firstname} onChange={this.handleChange} id="Firstname" name="Firstname" className="Signup-input"></input>
                                </div>
                                <div className="Auth-card-span">
                                    <label>Lastname</label>
                                    <input value={this.state.Lastname} onChange={this.handleChange} id="Lastname" name="Lastname" className="Signup-input"></input>
                                </div>
                                <div className="Auth-card-span">
                                    <label>Username</label>
                                    <input value={this.state.Username} onChange={this.handleChange} id="Username" name="Username" className="Signup-input"></input>
                                </div>
                                <div className="Auth-card-span">
                                    <label>E-mail</label>
                                    <input value={this.state.Email} onChange={this.handleChange} type="Email" id="Email" name="Email" className="Signup-input"></input>
                                </div>
                                <div className="Auth-card-span">
                                    <label>Password</label>
                                    <input value={this.state.Password} onChange={this.handleChange} id="Password" name="Password" type="Password" className="Signup-input"></input>
                                </div>
                                <div className="Auth-card-span">
                                    <label>Re-Password</label>
                                    <input value={this.state.RePassword} onChange={this.handleChange} id="RePassword" name="RePassword" type="Password" className="Signup-input"></input>
                                </div>
                                <div className="Auth-card-span Auth-submit-section">
                                    <div className="Auth-submit-btn-wrapper">
                                        <button type="submit">Register</button>
                                    </div>
                                    <div className="Auth-submit-link-wrapper">
                                        <label> Already have an account? <Link to= '/login' className="Auth-link">Login!</Link></label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
