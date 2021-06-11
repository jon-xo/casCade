import React, { useEffect, useContext, useState } from "react";
import { Typography, Paper, LinearProgress } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { SearchCard } from "./SearchCards";
import { SearchContext } from "./SearchProvider";
import "../Cascade.css";
import clsx from "clsx";

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
    bluePaper: {
        // Rectanglar ligt blue div
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.spacing(50),
        height: theme.spacing(5),
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        backgroundColor: theme.palette.primary.light,
        color: '#f5f5f5',
        fontWeight: 500,
    },
    strong: {
        fontWeight: '600',
    },
    typeOffset: {
        marginRight: theme.spacing(1),
    },
    statusContainer: {
        width: '80%',
        marginTop: theme.spacing(2)
    }
}))

// Custom styled LinearProgress bar for Search page

const SearchProgress = withStyles((theme) => ({
    root: {
        height: theme.spacing(1.1),
    },
    colorPrimary: {
        backgroundColor: theme.palette.warning.light
    },
    barColorPrimary: {
        backgroundColor: theme.palette.warning.dark
    }
}))(LinearProgress)

// Search list renders a div element which displays a Paper component
//  that contains the number of matches returned by search provider,
// aking with the SearchCard component which receives the individual result,
// mapped as gameQuery as a prop.

export const SearchList = () => {

    const { results, responseHeaders } = useContext(SearchContext)
    const [ searchReady, setSearchReady ] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if(!results.length)
        {
            setSearchReady(true)
        }
    }, [results])
    
    return (
        <>  <div className={classes.paperContainer}>
                {results.length > 0 ? 
                    <Paper elevation={4} className={classes.paper}>
                        <Typography variant="body1" className={clsx(classes.strong, classes.typeOffset)}>{results.length }</Typography><Typography variant="body1"> matches found.</Typography>
                    </Paper>
                    : 
                    <Typography></Typography>
                }
                { results.length === 0 ?
                    responseHeaders.QTime > 1 ?
                    <Paper elevation={4} className={classes.paper}>
                        <Typography variant="body1" className={clsx(classes.strong)}>No matches found.</Typography>
                    </Paper>: 
                    <Typography></Typography>
                    :
                    <Typography></Typography>
                }
                {
                    results === [] && responseHeaders === [] ? 
                    <Paper elevation={4} className={classes.bluePaper}>
                        <Typography variant="body1" className={clsx(classes.strong)}>Find a game!</Typography>
                    </Paper>
                    :
                    <Typography></Typography>
                }                            
            </div>
            <div className={classes.cardContainer}>
                {searchReady
                    ?
                    results.map((gameQuery) => {                 
                        return <SearchCard key={`${gameQuery.identifier}--searchCard`} game={gameQuery}/>
                    })
                    :
                    <div className={classes.statusContainer}>
                        <SearchProgress />                   
                    </div>
                }
            </div>
        </>
    )

};
