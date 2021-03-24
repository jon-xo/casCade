import React, { useState, createContext } from "react"

export const LibraryContext = createContext();

export const LibraryProvider = (props) => {
    const [ allGames , setAllGames ] = useState([])

    const getArcadeTitles  = () => {
        return fetch(`https://archive.org/services/search/v1/scrape?fields=title,genre,identifier,date,creator&q=collection%3Ainternetarcade`)
        .then(r => r.json())
        .then(searchResults => {
            setAllGames(searchResults.items)
        })
    };

    return (
        <LibraryContext.Provider value={{
            allGames, getArcadeTitles
        }}>
            {props.children}
        </LibraryContext.Provider>
    )
};