import React, { useEffect, useContext, useState } from "react";
import { Grid, Typography, Paper, LinearProgress } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { FavoritesContext } from "./FavoritesProvider";
import { FavoriteCard } from "./FavoritesCard";
import "../Cascade.css";
import clsx from "clsx";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        height: theme.spacing(1.5),
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
    titlePaper: {
        // Rectanglar blue-gray div
        width: theme.spacing(100),
        height: theme.spacing(15),
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        color: '#f5f5f5',
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
    iconText: {
        // Alternate text alignment
        display: 'flex-wrap',
        margin: theme.spacing(2),
        alignItems: 'stretch',
        justifyContent: 'center',
        textAlign: 'center'
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

// Custom styled LinearProgress bar for Favorites page

const FavoritesProgress = withStyles((theme) => ({
    root: {
        height: theme.spacing(1.1),
    },
    colorPrimary: {
        backgroundColor: theme.palette.error.light
    },
    barColorPrimary: {
        backgroundColor: theme.palette.error.dark
    }
}))(LinearProgress)

export const FavBanner = () => {
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
                        <Paper className={classes.titlePaper}>
                            <Typography variant="h3" className={classes.iconText}>Favorites</Typography>
                            <Typography variant="body1" className={classes.iconText}>Find the games you love</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
        
        </>
    )
};

export const FavoritesList = () => {
    
    const { favorites, getFavorites } = useContext(FavoritesContext)
    const [ favoritesReady, setfavoritesReady ] = useState(false);
    const classes = useStyles();

     // Use effect envokes API call
     useEffect(() => {
        getFavorites()
        if(favorites.length >= 1 )
        {
            setfavoritesReady(true);
        }
    }, [favorites])


    return (
        <>
            <FavBanner />
            <div className={classes.cardContainer}>
                {favoritesReady
                    ?
                favorites.map((favorite) => {
                    return <FavoriteCard key={`${favorite.gameId}--favCard`} game={favorite} />
                }):
                <div className={classes.statusContainer}>
                    <FavoritesProgress />                   
                </div>
                }
            </div>

        </>
    )
};