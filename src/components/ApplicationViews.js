import React from "react"
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { NavBar } from "./nav/NavBar";
import { LibraryBanner, LibraryList } from "./library/Library";
import { LibraryProvider } from "./library/LibraryProvider";
import { GameContainer } from "./player/Player";
import { SearchProvider } from "./search/SearchProvider";
import { Search } from "./search/Search";
import { SearchList } from "./search/SearchList";

// const gameRouter = ({gameContainer: GameContainer, ...rest}) => {
//     return <Route {...rest}    
//         render={routeProps => (
//             <>
//                 <NavBar />
//                 <GameContainer {...routeProps} />
//             </>
//         )}
//         />
// };

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
                <Route exact path='/library/player/:gameData'>
                    <NavBar />
                    <GameContainer />
                </Route>
            </LibraryProvider>
            <Route exact path="/favorites">
                <NavBar />
            </Route>
            <SearchProvider>
                <Route exact path="/search">
                    <NavBar />
                    <Search />
                    <SearchList />
                </Route>
                <Route exact path="/search/results?_:query">
                    <NavBar />
                    <Search />
                    <SearchList />
                </Route>
            </SearchProvider>
        </>
    )
};