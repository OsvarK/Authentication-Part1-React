import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Firstname: "",
            Lastname: "",
            Username: "",
            Email: "",
            Password: "",
            Error: null,
            Loading: false,
            showPassword: "Password",
            disabledSubmit: true,
            pasCheck: {
                pasHaveLowercase: "red",
                pasHaveUppsercase: "red",
                pasHasNumber: "red",
                pasHasSymbol: "red",
                pasHasLenght: "red",                      
            }
        }
    }

    // Updates input fields and states on user input
    handleChange = (e) => {
        this.forceUpdate();
        this.setState({
            [e.target.name]: e.target.value
        }, () => {           
                // Validate password
                var pas = this.state.Password;
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
                    this.state.Firstname !== "" && this.state.Lastname !== "" && this.state.Email !== "" && this.state.Username !== "") {
                    this.setState({ disabledSubmit: false });
                } else {
                    this.setState({ disabledSubmit: true });
                }
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
            <div className="register-wrapper">
                {this.state.Loading === true ? (<Loading />) : (
                    <form onSubmit={this.handleSubmit}>
                        <div className="Auth-card-span Auth-title-wrapper">
                            <h1 style={{ textAlign: "center" }} className="section-h1">Register Form</h1>
                        </div>
                        <Error />

                        <div className="Auth-card-span">
                            <label>Full name</label>
                            <div style={{ display: "flex" }}>
                                <input className="auth-input" style={{ width: "48%" }} value={this.state.Firstname} onChange={this.handleChange} placeholder="Firstname..." id="Firstname" name="Firstname"></input>
                                <input className="auth-input" style={{ width: "48%", marginLeft: "auto", order: "2" }} value={this.state.Lastname} onChange={this.handleChange} placeholder="Lastname..." id="Lastname" name="Lastname"></input>
                            </div>                             
                        </div>
                        <div className="Auth-card-span">
                            <label>Username</label>
                            <input className="auth-input" value={this.state.Username} onChange={this.handleChange} placeholder="Username..." id="Username" name="Username"></input>
                        </div>
                        <div className="Auth-card-span">
                            <label>E-mail</label>
                            <input className="auth-input" value={this.state.Email} onChange={this.handleChange} placeholder="E-Mail..." type="Email" id="Email" name="Email"></input>
                        </div>
                        <div className="Auth-card-span">
                            <label>Password</label>
                            
                            <div style={{display: "flex"}}>
                                <input className="auth-input" style={{ borderRadius: "4px 0 0 4px" }} value={this.state.Password} onChange={this.handleChange} placeholder="Password..." id="Password" name="Password" type={this.state.showPassword}></input>
                                <i onMouseLeave={() => this.setState({ showPassword: "Password" })} onMouseEnter={() => this.setState({showPassword: "Text"})} className="fa fa-eye" aria-hidden="true"></i>
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
                        </div>
                        <div className="Auth-card-span Auth-submit-section">
                            <div className="submit-btn-wrapper">
                                <button disabled={this.state.disabledSubmit} type="submit">Signup</button>
                            </div>
                            <div className="link-wrapper">
                                <Link to='/login' className="link black_link">
                                    <label>Login</label>
                                </Link>   
                            </div>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default RegisterForm;