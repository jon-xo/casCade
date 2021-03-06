// Declare empty arrays to store the json returned from getArcadeTitles fetch call

let arcadeResults = []
let queryDetails = []

// Create a copy of the archive.org arcade search results
export const useArcadeTitles = () => arcadeResults.slice();

// Use the spread operator to copy the archive.org search query object into a new array and return the result.
export const useQueryResults = () => {let quickCopy = [{...queryDetails}]; return quickCopy}


// Make fetch call to archive.org passing searching query,
// with hard coded search parameters provided by external API.
// Parse .json returned and store *only* search results and original query.

export const getArcadeTitles = (searchQuery) => {
    return fetch(`https://archive.org/advancedsearch.php?q=%28${searchQuery}%29+AND+collection%3A%28internetarcade%29&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=genre&fl%5B%5D=identifier&fl%5B%5D=mediatype&fl%5B%5D=name&fl%5B%5D=publisher&fl%5B%5D=source&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&save=yes`)
    .then(r => r.json())
    .then(searchResults => {
        const resultArray = searchResults.response.docs
        const queryArray = searchResults.responseHeader.params
  
        arcadeResults = resultArray
        queryDetails = queryArray                        
        
    })

};

// API search notes

// https://archive.org/advancedsearch.php?query=%28outrun%29%20AND%20collection%3A%28internetarcade%29
// https://archive.org/advancedsearch.php?q=subject%3Apalm+pilot+software&fl%5B%5D=identifier&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=100&page=5&output=json
// https://archive.org/advancedsearch.php?query=%28x-men%29%20AND%20collection%3A%28internetarcade%29&rows=100&output=json
// https://archive.org/advancedsearch.php?q=%28${searchQuery}%29+AND+collection%3A%28internetarcade%29&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=genre&fl%5B%5D=identifier&fl%5B%5D=mediatype&fl%5B%5D=name&fl%5B%5D=publisher&fl%5B%5D=source&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=callback&save=yes
