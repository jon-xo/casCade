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
import { FavortiesProvider } from "./favorites/FavoritesProvider";
import { Favorites } from "./favorites/Favorites";

export const ApplicationViews = () => {
    return (
        <>
        <SearchProvider>
            <LibraryProvider>
                    <Route exact path="/">
                        <NavBar />
                        <Home />
                    </Route>
            </LibraryProvider>
            <FavortiesProvider>
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
            </FavortiesProvider>
            <FavortiesProvider>
                <Route exact path="/favorites">
                    <NavBar />
                    <Favorites />
                </Route>
                <Route exact path='/favorites/player/:gameData'>
                        <NavBar />
                        <GameContainer />
                </Route>
            </FavortiesProvider>
            <FavortiesProvider>
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
                    <Route exact path="/search/player/:gameData">
                        <NavBar />
                        <GameContainer />
                    </Route>
                </FavortiesProvider>
            </SearchProvider>
        </>
    )
};