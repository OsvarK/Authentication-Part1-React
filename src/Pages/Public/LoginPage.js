import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm';

class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            emaillogin: false
        }
    }

    render() {
        return (
            <div>               
                <div className="floating-card-wrapper">
                    <div className="floating-card">
                        <LoginForm />
                    </div>               
                </div>
            </div>
        );
    }
}

export default LoginPage;
