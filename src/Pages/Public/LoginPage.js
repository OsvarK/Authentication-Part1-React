import React, { Component } from 'react';
import '../../CSS/Auth.css';
import LoginForm from '../../Components/LoginForm';

class LoginPage extends Component {
    render() {
        return (
            <div>               
                <div className="Auth-Wrapper">
                    <div className="Auth-Container">       
                        <div className="Auth-Card">                            
                            <LoginForm />
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default LoginPage;
