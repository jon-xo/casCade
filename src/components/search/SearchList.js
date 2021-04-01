import React, { useContext } from "react";
import { Typography, Paper } from "@material-ui/core";
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
    paperContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        // Rectanglar blue-gray div
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.spacing(50),
        height: theme.spacing(5),
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.light,
        color: '#f5f5f5',
        fontWeight: 500,
    },
    strong: {
        fontWeight: '600',
    },
    typeOffset: {
        marginRight: theme.spacing(1),
    }
}))

// Search list renders a div element which displays a Paper component
//  that contains the number of matches returned by search provider,
// aking with the SearchCard component which receives the individual result,
// mapped as gameQuery as a prop.

export const SearchList = () => {

    const classes = useStyles();

    const { results } = useContext(SearchContext)
      
    return (
        <>  <div className={classes.paperContainer}>
                {results.length > 0 ? <Paper elevation={4} className={classes.paper}><Typography variant="body1" className={clsx(classes.strong, classes.typeOffset)}>{results.length }</Typography><Typography variant="body1"> matches found.</Typography></Paper>: <Typography></Typography>}                            
            </div>
            <div className={classes.cardContainer}>
                {results.map((gameQuery) => {                 
                    return <SearchCard key={`${gameQuery.identifier}--searchCard`} game={gameQuery} />
                })}
            </div>
        </>
    )

};
