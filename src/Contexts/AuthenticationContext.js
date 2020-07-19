import React, { Component, createContext } from 'react';

export const AuthenticationContext = createContext();

export class AuthenticationProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: true,
            isAuthenticated: false,
            isUsingAlternativeLogin: false,
            AlternativeLoginProvider: "NONE",
            UserData: {
                Username: 'NONE',
                Firstname: 'NONE',
                Lastname: 'NONE',
                Email: 'NONE',
                IsAdmin: 'NONE'
            }
        }
    }

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
                response.json().then(data => {
                    this.setState({
                        UserData: {
                            Username: data.username,
                            Firstname: data.firstname,
                            Lastname: data.lastname,
                            Email: data.email,
                            IsAdmin: data.idAdmin
                        }
                    })
                })
                this.setState({ isAuthenticated: true })
                // Populate the UserDataContext with the users data
            } else {
                this.setState({ isAuthenticated: false })
            }
        }
        catch (e) {
            console.log(e);
        }
        this.setState({ Loading: false });
    }

    // Logout user, with Fetch.
    Logout = async (e) => {
        this.setState({ Loading: true });
        try {
            await fetch(`/api/auth/logout`); // <---- Fetch url for logout.
            // Redirect to home page.
            window.location.href = '/'
        }
        catch (e) {
            console.log(e);
        }
        this.setState({ Loading: false });
    }

    render() {
        return (
            <AuthenticationContext.Provider value={{ ...this.state, Logout: this.Logout }}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}