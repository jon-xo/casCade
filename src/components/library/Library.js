import React, { useEffect, useContext, useState } from "react";
import { Grid, Typography, Paper, LinearProgress } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { LibraryContext } from "./LibraryProvider";
import { LibraryCard } from "./LibraryCard";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '16rem',
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
    paper: {
        // Rectanglar blue-gray div
        width: theme.spacing(100),
        height: theme.spacing(15),
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        color: '#f5f5f5',
    },
    iconText: {
        // Alternate text alignment
        display: 'flex-wrap',
        margin: theme.spacing(2),
        alignItems: 'stretch',
        justifyContent: 'center',
        textAlign: 'center'
    },
    redIcon: {
        // Create red circular bubble for material-ui icons
        fontSize: '1.5rem',
        padding: theme.spacing(.5),
        // border: `solid ${theme.palette.error.dark}`,
        // backgroundColor: theme.palette.error.dark,
        // borderRadius: '50%',
        color: '#f5f5f5',
        "&:hover": {
            color: theme.palette.error.main,
        }
    },
    yellowIcon: {
        // Create yellow circular bubble for material-ui icons
        fontSize: '1.5rem',
        padding: theme.spacing(.5),
        border: `solid ${theme.palette.warning.main}`,
        backgroundColor: theme.palette.warning.main,
        borderRadius: '50%',
        color: '#f5f5f5',
    },
    blueIcon: {
        // Create blue circular bubble for material-ui icons
        fontSize: '1.5rem',
        padding: theme.spacing(.5),
        border: `solid ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: '50%',
        color: '#f5f5f5',
    },
    statusContainer: {
        width: '80%',
        marginTop: theme.spacing(2)
    }
}))

// Custom styled LinearProgress bar for Library page

const LibraryProgress = withStyles((theme) => ({
    root: {
        height: theme.spacing(1.1),
    },
    colorPrimary: {
        backgroundColor: theme.palette.primary.light
    },
    barColorPrimary: {
        backgroundColor: theme.palette.primary.dark
    }
}))(LinearProgress)

// Library header banner Component

export const LibraryBanner = () => {
    const classes = useStyles();

    return (
        <>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                    <Grid item>
                        <Paper className={classes.paper}>
                            <Typography variant="h3" className={classes.iconText}>Library</Typography>
                            <Typography variant="body1" className={classes.iconText}>Browse all titles</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
        
        </>
    )
};

// Library list component 

export const LibraryList = () => {
    // API provider and data returned is accessed via useContext
    const { allGames , getArcadeTitles } = useContext(LibraryContext)
    const [ libraryReady, setLibraryReady ] = useState(false);
    const classes = useStyles();

    // Use effect envokes API call
    useEffect(() => {
        getArcadeTitles(150)
        if(allGames.length >= 1 )
        {
            setLibraryReady(true);
        }
    }, [allGames, getArcadeTitles])
    

    // Return statement renders the cardContainer element and 
    // maps through each result and renders the child LibraryCard element,
    // game details are passed through the compenent's props.
    return (
        <>
        <div className={classes.cardContainer}>
            {libraryReady
                ? allGames.map(game => {
                
                return  <>
                            <LibraryCard key={`${game.identifier}_libcard`} game={game}/>
                        </>                    
                }):
                <div className={classes.statusContainer}>
                    <LibraryProgress />                    
                </div>
            }
        </div>
        </>
        
        
            
    )
    
};