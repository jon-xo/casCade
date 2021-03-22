import React from "react"
import { Home } from "./Home";
import { Route } from "react-router-dom";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
        
        </>
    )
};