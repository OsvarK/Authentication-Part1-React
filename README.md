# Authentication using React & .NET
This is the frontend part, View the .NET backend part [here!](https://github.com/OsvarK/AuthProject-Part2-DOTNET)
# Introduction 
The goal of this project is to learn the .NET framework, but also get some understanding on how i can handle authentication using tokens. I'm using React as a frontend framework because im quite familiar with it. Because of my first time creating something like this, there is probely some mistakes or bad practises that i'm unaware off and should therefore never be used as a real application.  

# The AuthenticationRouter
The Authentication Router is wrapping all the components in the application to determine the state of the authentication of the user. we do also wrapp everything with the AuthenticationProvider to gain all the components the access to its context.

## Tech
 * Route
 * Context

### The Private Route
The private does ONLY allow authenticated users.
```javascript
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
```
### The Public Route
The private does ONLY allow NONE authenticated users. (good for exampel the login or signup page), to show page for both auth and none auth users we just use a normal route.
```javascript
        /* -----------------------------------------------------------------------------------------------------------
         * Public Route
         * A public route can only be showed by NONE authenticated users.
        */ 
        const PublicRoute = ({ component: Component, ...rest }) => {
            // Get Authentication context
            const Auth = useContext(AuthenticationContext);
            // Check if loading (The loading is here cuz we are waiting for respond from backend).
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
```
### The render
how it all come together.
```javascript
        return (
            <AuthenticationProvider>
                    <Router>
                        <Switch>
                            {/* Private Routes -------------------------------------------------------- */}
                            <PrivateRoute path='/myprofile' component={() => <UserDashboard />} />
                            {/* Public Routes --------------------------------------------------------- */}
                            <PublicRoute path="/login" component={() => <LoginPage />} />
                            <PublicRoute path="/register" component={() => <SignupPage />} />
                            {/* Index Route ----------------------------------------------------------- */}
                            <PublicRoute path="/" component={() => <LoginPage />} />
                        </Switch>
                    </Router>
            </AuthenticationProvider>
        );
```


## Why no Redux?
i'm not comfortable workign with them yet, becouse i havent done enough reading, and i feel like they are not necessary for this project, yet.

### The react part of this project is quite straightforward and therefor skipping a lot of unnecessary documentation :)


