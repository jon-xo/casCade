import React from "react"
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { NavBar } from "./nav/NavBar";
import { LibraryBanner, LibraryList } from "./library/Library";
import { LibraryProvider } from "./library/LibraryProvider";
import { GameContainer } from "./player/Player";

const gameRouter = ({gameContainer: GameContainer, ...rest}) => {
    return <Route {...rest}    
        render={routeProps => (
            <>
                <NavBar />
                <GameContainer {...routeProps} />
            </>
        )}
        />
};

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <NavBar />
                <Home />
            </Route>
            <LibraryProvider>
                <Route exact path="/library">
                    <NavBar />
                    <LibraryBanner />
                    <LibraryList />
                </Route>
                <Route path='/library/player/:gameData'>
                    <NavBar />
                    <GameContainer />
                </Route>
            </LibraryProvider>
            <Route exact path="/favorites">
                <NavBar />
            </Route>
            <Route exact path="/search">
                <NavBar />
            </Route>
            {/* <Route exact path="/player">
                <NavBar />
                <GameContainer />
            </Route> */}
        </>
    )
};