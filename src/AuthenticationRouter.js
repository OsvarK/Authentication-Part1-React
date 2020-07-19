import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthenticationProvider, AuthenticationContext } from './Contexts/AuthenticationContext';
import './CSS/Auth.css';
// Imported components
import Loading from './Components/Loading';
import LoginPage from './Pages/Public/LoginPage';
import RegisterPage from './Pages/Public/RegisterPage';
// Imported private components
import { useContext } from 'react';
import UserDashboard from './Pages/Private/UserDashboardPage';

class AuthenticationRouter extends Component {
    render() {  
       
        /* -----------------------------------------------------------------------------------------------------------
         * Private Route
         * A private route can only be showed by authenticated users.
        */      
        const PrivateRoute = ({ component: Component, ...rest }) => {
            // Get Authentication context
            const Auth = useContext(AuthenticationContext);
            // Check if loading (The loading is here cuz we are waiting for respond from backend)
            if (Auth.Loading) {
                return (<Loading />) 
            } else {
                // Loading is done, we have a respond, determine if we are authenticated or not. 
                if (Auth.isAuthenticated === true) {
                    // We are auth, render the private component
                    return (<Route {...rest} render={(props) => (<Component {...props} />)} />)
                } else {
                    // We are NOT authenticated, Redirect
                    return (<Redirect to='/login' />)                    
                }
            }
        }


        /* -----------------------------------------------------------------------------------------------------------
         * Public Route
         * A public route can only be showed by NONE authenticated users.
        */ 
        const PublicRoute = ({ component: Component, ...rest }) => {
            // Get Authentication context
            const Auth = useContext(AuthenticationContext);
            // Check if loading (The loading is here cuz we are waiting for respond from backend)
            if (Auth.Loading) {
                return (<Loading />)
            } else {
                // Loading is done, we have a respond, determine if we are authenticated or not.
                if (Auth.isAuthenticated === false) {
                    // We are auth, render the private component
                    return (<Route {...rest} render={(props) => (<Component {...props} />)} />)
                } else {
                    // We are authenticated, Redirect
                    return (<Redirect to='/myprofile' />)
                }
            }
        }

        // To show page to both none and auth users, use Route.
        // Render -----------------------------------------------------------------------------------------------------------
        return (
            <AuthenticationProvider>
                    <Router>
                        <Switch>
                            {/* Private Routes -------------------------------------------------------- */}
                            <PrivateRoute path='/myprofile' component={() => <UserDashboard />} />
                            {/* Public Routes --------------------------------------------------------- */}
                            <PublicRoute path="/login" component={() => <LoginPage />} />
                            <PublicRoute path="/login" component={() => <LoginPage />} />
                            <PublicRoute path="/register" component={() => <RegisterPage />} />
                            {/* Index Route ----------------------------------------------------------- */}
                            <PublicRoute path="/" component={() => <LoginPage />} />
                        </Switch>
                    </Router>
            </AuthenticationProvider>
        );
    }
}

export default AuthenticationRouter;
