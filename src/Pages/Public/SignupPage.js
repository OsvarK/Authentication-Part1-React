import React, { Component } from 'react';
import SignupForm from '../../Components/SignupForm';

class SignupPage extends Component {
    render() {
        return (
            <div>
                <div className="floating-card-wrapper">
                    <div className="floating-card">                          
                        <SignupForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupPage;
