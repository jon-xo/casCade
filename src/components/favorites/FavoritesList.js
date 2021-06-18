import React, { useEffect, useContext, useState } from "react";
import { LinearProgress } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { FavoritesContext } from "./FavoritesProvider";
import { FavoriteCard } from "./FavoritesCard";
import "../Cascade.css";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    // root: {
    //     maxWidth: '16rem',
    // },
    cardContainer: {
        // Styles for div which holds all rendered game cards
        minWidth: '50vw',
        maxWidth: '95vw',
        margin: theme.spacing(6),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
        // eslint-disable-next-line
    }, [favorites.length])


    return (
        <>

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