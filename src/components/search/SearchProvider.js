import React, { useState, createContext } from "react"

export const SearchContext = createContext();

export const SearchProvider = (props) => {
    const [ results, setResults ] = useState([])
    const [ responseHeaders, setResponseHeaders ] = useState([]);
    const [ searchReady, setSearchReady ] = useState(false);
    const [ pageLoaded, setPageLoaded ] = useState(true);

    const getSearchResults = (query) => {
        return fetch(`https://archive.org/advancedsearch.php?q=%28${query}%29+AND+collection%3A%28internetarcade%29&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=genre&fl%5B%5D=identifier&fl%5B%5D=mediatype&fl%5B%5D=name&fl%5B%5D=creator&fl%5B%5D=source&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&save=yes`)
        .then(r => r.json())
        .then(searchResults => {
            // console.log(searchResults);            
            setResults(searchResults.response.docs)
            setResponseHeaders(searchResults.responseHeader)
        })
        

    };

    return (
        <SearchContext.Provider value={{
            getSearchResults, 
            setResults, 
            results, 
            setResponseHeaders, 
            responseHeaders,
            searchReady, 
            setSearchReady,
            pageLoaded, 
            setPageLoaded
        }}>
            {props.children}
        </SearchContext.Provider>
    )
};