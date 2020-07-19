import React, { Component } from 'react';
import RegisterForm from '../../Components/RegisterForm';

class RegisterPage extends Component {
    render() {
        return (
            <div>
                <div className="floating-card-wrapper">
                    <div className="floating-card">                          
                        <RegisterForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPage;
