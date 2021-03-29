import React, { useState, createContext } from "react"

export const SearchContext = createContext();

export const SearchProvider = (props) => {
    const [ results, setResults] = useState([])

    const getSearchResults = (query) => {
        return fetch(`https://archive.org/advancedsearch.php?q=%28${query}%29+AND+collection%3A%28internetarcade%29&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=genre&fl%5B%5D=identifier&fl%5B%5D=mediatype&fl%5B%5D=name&fl%5B%5D=publisher&fl%5B%5D=source&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&save=yes`)
        .then(r => r.json())
        .then(searchResults => {
            setResults([searchResults.responseHeader.params, searchResults.response.docs])
        })
    };

    return (
        <SearchContext.Provider value={{
            results, setResults
        }}>
            {props.children}
        </SearchContext.Provider>
    )
};