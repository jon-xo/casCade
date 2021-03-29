import React from "react";

export const truncate = (str, n) => {
    return (str.length > n) ? <span>{(str.substr(0, n-1 ))}&hellip;</span> : str;
};

export const cardTitle = (title, length) => {
    let editedTitle = title.replace(/ *\([^)]*\) */g, '').replace('Internet Arcade:', '')
    return truncate(editedTitle, length)
};

export const releaseDate = (date) => {
    const editedDate = date.replace('-01-01T00:00:00Z', '')
    if (editedDate.includes('19')) {
        return parseInt(editedDate)
    } else {
        return editedDate
    }
};

export const SearchFormatter = ( originalQuery ) => {
    
    const createQueryArray = (uneditedQuery) => {
        if (originalQuery !== "" && originalQuery.indexOf(' ') >= 0) {
            const replaceSpaces = originalQuery.split(" ")
            return replaceSpaces
        }        
    };

    const queryArray = createQueryArray(originalQuery)


    const createQueryString = (uneditedArray) => {
        if (queryArray !== undefined && queryArray.length > 0) {
            return queryArray.join("%20")
        }
    }
    
    const finalQuery = createQueryString(queryArray);
    
    if (finalQuery !== undefined) {
        return finalQuery;
    }

    // if (queryArray !== undefined && queryArray.length) {
    //     let unicodeArray = queryArray.forEach(word => {
    //         if(queryArray.includes('-')) {
    //             const hyphenIndex = queryArray.indexOf('-');
    //             queryArray[hyphenIndex] = "\u2010";
    //         }
    //         if(queryArray.includes(':')) {
    //             const colonIndex = queryArray.indexOf(':');
    //             queryArray[colonIndex] = "\x3a";
    //         } 
    //     });
    //     return unicodeArray
    // }
    
};