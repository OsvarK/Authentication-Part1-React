import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class SignupForm extends Component {
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
                var pas = new String(this.state.Password);

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
            <div>
                {this.state.Loading === true ? (<Loading />) : (
                    <form onSubmit={this.handleSubmit}>
                        <div className="Auth-card-span Auth-title-wrapper">
                            <h1 className="Auth-title">Register</h1>
                        </div>
                        <Error />

                        <div className="Auth-card-span">
                            <label>Full name</label>
                            <div style={{ display: "flex" }}>
                                <input style={{ float: "left", marginRight: "5px"}} value={this.state.Firstname} onChange={this.handleChange} placeholder="Firstname..." id="Firstname" name="Firstname"></input>
                                <input style={{ float: "right", marginleft: "5px" }} value={this.state.Lastname} onChange={this.handleChange} placeholder="Lastname..." id="Lastname" name="Lastname"></input>
                            </div>                             
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
                            
                            <div style={{display: "flex"}}>
                                <input style={{ borderRadius: "4px 0 0 4px" }} value={this.state.Password} onChange={this.handleChange} placeholder="Password..." id="Password" name="Password" type={this.state.showPassword}></input>
                                <i onMouseLeave={() => this.setState({ showPassword: "Password" })} onMouseEnter={() => this.setState({showPassword: "Text"})} className="fa fa-eye" aria-hidden="true"></i>
                            </div>
                            <div className="password-security-hints">
                                <label>Password requirements.</label>
                                <label className={this.state.pasCheck.pasHaveLowercase}>One lowercase charachter</label>
                                <label className={this.state.pasCheck.pasHaveUppsercase}>One uppsercase charachter</label>
                                <label className={this.state.pasCheck.pasHasNumber}>One number</label>
                                <label className={this.state.pasCheck.pasHasSymbol}>One special charachter</label>
                                <label className={this.state.pasCheck.pasHasLenght}>8 characters minimum</label>    
                            </div>
                        </div>
                        <div className="Auth-card-span Auth-submit-section">
                            <div className="submit-btn-wrapper">
                                <button disabled={this.state.disabledSubmit} type="submit">Signup</button>
                            </div>
                            <div className="Auth-submit-link-wrapper">
                                <label> Already have an account? <Link to= '/login' id="link">Login!</Link></label>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default SignupForm;