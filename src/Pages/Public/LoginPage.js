import React, { Component } from 'react';
import '../../CSS/Auth.css';
import LoginForm from '../../Components/LoginForm';

class LoginPage extends Component {
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
