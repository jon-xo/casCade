import React from "react"
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ApplicationViews } from "./ApplicationViews";
import { SnackbarProvider } from "notistack";
import { Slide } from '@material-ui/core';
import "./Cascade.css"

export const Cascade = () => (
    <>

    <Route
        render={() => {
            if (localStorage.getItem("cascade_user")) {
                return (
                    <>
                        <SnackbarProvider 
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                              }}
                              TransitionComponent={Slide}
                              maxSnack={3}
                              >
                            <ApplicationViews />
                        </SnackbarProvider>
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }}
    
    />

    <Route path="/login">
      {/* Render the Login function on envocation of /login */}
      <Login />
    </Route>
    <Route path="/register">
      {/* Render the Register function on envocation of /register */}
      <Register />
    </Route>  
    
    </>
);

