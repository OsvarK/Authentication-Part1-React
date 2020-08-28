import React, { Component } from 'react';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';
import Loading from './Loading';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false,
            Error: null
        }
    }


    onChangeHandler = event => {
        this.onUploadProfilePicture();
    }

    onUploadProfilePicture = async () => {
        this.setState({ Loading: true });
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        formData.append('imagefile', fileField.files[0]);

        const settings = {
            method: 'POST',
            body: formData
        };
        try {
            const Response = await fetch(`/api/auth/upload/profileimage`, settings);
            if (Response.ok) {
                // Successful Post Request
                window.location.reload(false); 
            } else {
                // Failed Post Request
                const getError = await Response.json();
                this.setState({ Loading: true });
                this.setState({ Error: getError });
            }
        } catch (e) {
            // error handler
            console.error(e);
            this.setState({ Error: "Error with request" })
        }
        this.setState({ Loading: false });
    }

    render() {

        var loginProvider = this.context.isUsingAlternativeLogin;
        if (loginProvider === true) {
            loginProvider = this.context.AlternativeLoginProvider;
        } else {
            loginProvider = "false";
        }
        var isAdmin = (this.context.UserData.IsAdmin).toString();

        return (
            <div>
                {this.state.Loading === true ? (<Loading />) : (
                    <div className="floating-card">
                        <h1 className="section-h1" >Account Information</h1>
                        <div className="account-information-card">
                            <div className="account-informatio-content">
                                <div className="user-info">
                                    <img alt="unable to load img" src={this.context.UserData.ProfileImageUrl}></img>
                                </div>
                            </div>
                            <div className="account-informatio-content">
                                <div className="user-info">
                                    <div>
                                        <label for="files" style={{ color: "#0086f4", cursor: "pointer", width: "100%" }} class="btn">Change profile picture</label>
                                        <input onChange={this.onChangeHandler} id="files" style={{ visibility: "hidden", cursor: "pointer" }} type="file"></input>
                                    </div>
                                </div>
                                <div className="user-info">
                                    <label>Fullname:</label>
                                    <label>{this.context.UserData.Firstname} {this.context.UserData.Lastname}</label>
                                </div>
                                <div className="user-info">
                                    <label>Username:</label>
                                    <label>{this.context.UserData.Username}</label>
                                </div>
                                <div className="user-info">
                                    <label>E-mail:</label>
                                    <label>{this.context.UserData.Email}</label>
                                </div>
                                <div className="user-info">
                                    <label>Linked Account:</label>
                                    <label>{loginProvider}</label>
                                </div>
                                <div className="user-info">
                                    <label>Is Admin:</label>
                                    <label>{isAdmin}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
            </div>        
        );
    }
}

UserProfile.contextType = AuthenticationContext;
export default UserProfile;
