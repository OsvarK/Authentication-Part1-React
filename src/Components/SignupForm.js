import React, { Component } from 'react';
import '../CSS/Auth.css';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class SignupForm extends Component {
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
            Loading: false
        }
    }

    // Updates input fields and states on user input
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = async(e) => {
        e.preventDefault();
        // Loading on
        this.setState({Loading: true});
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
        this.setState({Loading: false});
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
                {this.state.Loading === true ? (<Loading />) : (
                    <form onSubmit={this.handleSubmit}>
                        <div className="Auth-card-span Auth-title-wrapper">
                            <h1 className="Auth-title">Signup Form</h1>
                        </div>
                        <Error />
                        <div className="Auth-card-span">
                            <label>Firstname</label>
                            <input value={this.state.Firstname} onChange={this.handleChange} placeholder="First name..." id="Firstname" name="Firstname"></input>
                        </div>
                        <div className="Auth-card-span">
                            <label>Lastname</label>
                            <input value={this.state.Lastname} onChange={this.handleChange} placeholder="Last Name..." id="Lastname" name="Lastname"></input>
                        </div>
                        <div className="Auth-card-span">
                            <label>Username</label>
                            <input value={this.state.Username} onChange={this.handleChange} placeholder="Username..." id="Username" name="Username"></input>
                        </div>
                        <div className="Auth-card-span">
                            <label>E-mail</label>
                            <input value={this.state.Email} onChange={this.handleChange} placeholder="E-Mail..." type="Email" id="Email" name="Email"></input>
                        </div>
                        <div className="Auth-card-span">
                            <label>Password</label>
                            <input value={this.state.Password} onChange={this.handleChange} placeholder="Password..." id="Password" name="Password" type="Password"></input>
                        </div>
                        <div className="Auth-card-span">
                            <label>Re-enter Password</label>
                            <input value={this.state.RePassword} onChange={this.handleChange} placeholder="Password..." id="RePassword" name="RePassword" type="Password"></input>
                        </div>
                        <div className="Auth-card-span Auth-submit-section">
                            <div className="submit-btn-wrapper">
                                <button type="submit">Signup</button>
                            </div>
                            <div className="Auth-submit-link-wrapper">
                                <label> Already have an account? <Link to= '/login' className="Auth-link">Login!</Link></label>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default SignupForm;