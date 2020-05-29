import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './CSS/AuthenticationRouter.css';

// Imported components
import Loading from './Pages/Public/Loading';
import Login from './Pages/Public/Login';
import Signup from './Pages/Public/Signup';
// Imported private components
import ProfileSettings from './Pages/Private/ProfileSettings'

class AuthenticationRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            Loading: true,  // <-- Default most be true.
            ErrorMsg: null,
            UserData: {
                Firstname: "Oscar",
                Lastname: "karlsson"
            }
        }

        //Binds
        this.Logout = this.Logout.bind(this);
        this.LoadingOn = this.LoadingOn.bind(this);
        this.LoadingOff = this.LoadingOff.bind(this);
    }

    componentDidMount() {
        this.Authenticate(); // Autenticate on load.
    }

    // Authenticate user, with Fetch.
    Authenticate = async () => {
        this.setState({ Loading: true });
        try {           
            const response = await fetch(`/api/auth/auth`); // <---- Fetch url for Authentication.
            // If Response is OK, the user is Authenticated
            if (response.ok) {
                this.setState({ isAuthenticated: true })
            } else {
                this.setState({ isAuthenticated: true }) // <- debug for full auth
            }
        }
        catch (e){
            console.log(e);
        }
        this.setState({ Loading: false });
    }

    // Logout user, with Fetch.
    Logout = async (e) => {
        try {
            await fetch(`/api/auth/logout`); // <---- Fetch url for logout.
            // Redirect to home page.
            window.location.href = '/'
        }
        catch (e){
            console.log(e);
        }
    }

    // Toggle Loading
    LoadingOn = () => {
        this.setState({ Loading: true });
    }
    LoadingOff = () => {
        this.setState({ Loading: false });
    }


    render() {

        /* -----------------------------------------------------------------------------------------------------------
         * Private Route
         * A public route can only be showed by authenticated users.
        */
        const PrivateRoute = ({ component: Component, ...rest }) => {
            // Check if loading (The loading is here cuz we are waiting for respond from backend)
            if (this.state.Loading) {
                return (<Loading />) 
            } else {
                // Loading is done, we have a respond, determine if we are authenticated or not.
                if (this.state.isAuthenticated === true) {
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
         * A public route can only be showed by none authenticated users.
        */ 
        const PublicRoute = ({ component: Component, ...rest }) => {
            // Check if loading (The loading is here cuz we are waiting for respond from backend)
            if (this.state.Loading) {
                return (<Loading />)
            } else {
                // Loading is done, we have a respond, determine if we are authenticated or not.
                if (this.state.isAuthenticated === false) {
                    // We are auth, render the private component
                    return (<Route {...rest} render={(props) => (<Component {...props} />)} />)
                } else {
                    // We are authenticated, Redirect
                    return (<Redirect to='/auth' />)
                }
            }
        }

        // Render -----------------------------------------------------------------------------------------------------------
        return (
            <div>
                {this.state.Loading === true ? (<Loading />) : (null)}
                <Router>                            
                    <Switch>
                        {/* Private Routes -------------------------------------------------------- */}
                        <PrivateRoute path='/auth' component={() => <ProfileSettings LoadingOn={this.LoadingOn} LoadingOff={this.LoadingOff} />} />
                        {/* Public Routes --------------------------------------------------------- */}
                        <PublicRoute path="/login" component={() => <Login LoadingOn={this.LoadingOn} LoadingOff={this.LoadingOff} />} />
                        <PublicRoute path="/signup" component={() => <Signup LoadingOn={this.LoadingOn} LoadingOff={this.LoadingOff} />} />                                    
                        {/* Index Route ----------------------------------------------------------- */}
                        <PublicRoute path="/" component={() => <Login />} />
                    </Switch>
                </Router>            
            </div>

        );
    }
}

export default AuthenticationRouter;
