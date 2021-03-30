import React, { useEffect, useContext, useState } from "react"
import { Grid, Typography, Paper } from "@material-ui/core";
import { fade , makeStyles } from "@material-ui/core/styles";
import { truncate , cardTitle, releaseDate } from "../StrManipulation";
import { SearchBar } from "./SearchBar";
import { SearchContext } from "./SearchProvider";
import clsx from "clsx";
import "../Cascade.css";
import { useHistory, useLocation } from "react-router-dom";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    searchContainer: {
        width: '50rem',        
    }
}))

export const Search = () => {
    const [ results, setResults ] = useState([]);
    const classes = useStyles();
    
    return (
        <>
            <div classes={classes.root}>
                <Grid
                    container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={10}>
                        <SearchBar 
                            props={results} 
                            onClick={(event) => {
                                console.log(event);                                
                                if(event.target.id === "searchSubmit") {
                                    console.log('Search Submit clicked.')
                                }
                            }}/>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <div>
                        {/* {results.response.docs.map(game => {
                            return <SearchCard 
                                    key={() => {
                                        let int = 1
                                        return `result_0${int++}`
                                    }}
                                    game={game}
                                />
                        })} */}
                    </div>
                </Grid>
            </div>
        </>
    )
};

export const SearchList = () => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    if(location.path.includes("results?_")) {
        const resultArray = location.state

        console.log(resultArray);
        
    }
};
