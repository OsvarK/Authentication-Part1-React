import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Imported components
import Loading from './Components/Loading';
import LoginPage from './Pages/Public/LoginPage';
import SignupPage from './Pages/Public/SignupPage';
// Imported private components
import ProfileSettingsPage from './Pages/Private/ProfileSettingsPage'

class AuthenticationRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            Loading: true,  // <-- Default most be true. it start the site with doing a fetch request do check if the user is authenticated, when the fetch is done. we stop loading.
            ErrorMsg: null,
            UserData: {
                Username: "",
                Firstname: "",
                Lastname: "",
                Email: "",
            }
        }
        //Binds
        this.Logout = this.Logout.bind(this);
    }

    // call authentication fetch request on load.
    componentDidMount() {
        this.Authenticate();
    }

    // Authenticate user.
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

    render(){  
        /* -----------------------------------------------------------------------------------------------------------
         * Private Route
         * A private route can only be showed by authenticated users.
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
         * A public route can only be showed by NONE authenticated users.
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

        // To show page to both none and auth users, use Route.
        // Render -----------------------------------------------------------------------------------------------------------
        return (
            <div>
                {this.state.Loading === true ? (<Loading />) : (null)}
                <Router>                            
                    <Switch>
                        {/* Private Routes -------------------------------------------------------- */}
                        <PrivateRoute path='/auth' component={() => <ProfileSettingsPage />} />
                        {/* Public Routes --------------------------------------------------------- */}
                        <PublicRoute path="/login" component={() => <LoginPage />} />
                        <PublicRoute path="/signup" component={() => <SignupPage />} />                                    
                        {/* Index Route ----------------------------------------------------------- */}
                        <PublicRoute path="/" component={() => <LoginPage />} />
                    </Switch>
                </Router>            
            </div>

        );
    }
}

export default AuthenticationRouter;
