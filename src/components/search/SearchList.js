import React, { useEffect, useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { SearchCard } from "./SearchCards";
import { SearchContext } from "./SearchProvider";
import clsx from "clsx";
import "../Cascade.css";

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
    cardContainer: {
        // Styles for div which holds all rendered game cards
        minWidth: '50vw',
        maxWidth: '95vw',
        margin: theme.spacing(6),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}))

export const SearchList = () => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const { results } = useContext(SearchContext)

    console.log(results);
    

    let i = 1
    const quickKey = () => {
        return `ptag${i++}`
    };
    
    return (
        <>
            <div className={classes.cardContainer}>                
                {results.map((gameQuery) => {
                    return <SearchCard game={gameQuery} />
                })}
            </div>
        </>
    )

    // if(location.path.includes("results?_")) {
    //     const resultArray = location.state

    //     console.log(resultArray);
        
    // }
};
