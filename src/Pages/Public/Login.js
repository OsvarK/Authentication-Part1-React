import React, { Component } from 'react';
import '../../CSS/Auth.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: null,
            Password: null,
            Error: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.LoadingOn();
        // Loading on
        const sendData = {
            Username: this.state.Username,
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
            const Response = await fetch(`/api/auth/login`, settings);
            if (Response.ok) {
                // Successful Post Request, Login user here
                window.location.href = '/dashboard'

            } else {
                // Failed Post Request
                const getError = await Response.json();
                this.setState({ Error: getError });
                
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
                                    <label className="Auth-title">Login</label>
                                </div>
                                <Error />
                                <div className="Auth-card-span">
                                    <label>Username</label>
                                    <input value={this.state.Username} onChange={this.handleChange} id="Username" name="Username" className="Login-input"></input>
                                </div>
                                <div className="Auth-card-span">
                                    <label>Password</label>
                                    <input value={this.state.Password} onChange={this.handleChange} id="Password" name="Password" type="Password" className="Login-input"></input>
                                </div>
                                <div className="Auth-card-span Auth-submit-section">
                                    <div className="Auth-submit-btn-wrapper">
                                        <button type="submit">Login</button>
                                    </div>
                                    <div className="Auth-submit-link-wrapper">
                                        <label> Need an account? <Link to= '/signup' className="Auth-link">Signup!</Link></label>
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

export default Login;
