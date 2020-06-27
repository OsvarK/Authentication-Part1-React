import React, { Component }  from 'react';
import '../CSS/Loading.css';
import Loading from './Loading';
import { Link } from 'react-router-dom';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: null,
            Password: null,
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

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({Loading: true});
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
                            <h1 className="Auth-title">Login Form</h1>
                        </div>
                        <Error />
                        <div className="Auth-card-span">
                            <label>Username</label>
                            <input value={this.state.Username} onChange={this.handleChange} id="Username" name="Username" placeholder="Username..."></input>
                        </div>
                        <div className="Auth-card-span">
                            <label>Password</label>
                            <input value={this.state.Password} onChange={this.handleChange} id="Password" name="Password" type="Password" placeholder="Password..."></input>
                        </div>
                        <div className="Auth-card-span Auth-submit-section">
                            <div className="submit-btn-wrapper">
                                <button type="submit">Login</button>
                            </div>
                            <div className="Auth-submit-link-wrapper">
                                <label> Need an account? <Link to= '/signup' className="Auth-link">Signup!</Link></label>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default LoginForm;