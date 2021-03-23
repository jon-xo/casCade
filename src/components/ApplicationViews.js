import React from "react"
import { Home } from "./Home";
import { NavBar } from "./nav/NavBar";
import { Route } from "react-router-dom";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <NavBar />
                <Home />
            </Route>
            <Route exact path="/library">
                <NavBar />
            </Route>
            <Route exact path="/favorites">
                <NavBar />
            </Route>
            <Route exact path="/search">
                <NavBar />
            </Route>
        
        </>
    )
};