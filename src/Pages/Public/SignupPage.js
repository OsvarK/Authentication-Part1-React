import React, { Component } from 'react';
import '../../CSS/Auth.css';
import SignupForm from '../../Components/SignupForm';


class SignupPage extends Component {
    render() {
        return (
            <div>
                <div className="Auth-Wrapper">
                    <div className="Auth-Container">
                        <div className="Auth-Card">                          
                            <SignupForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupPage;
