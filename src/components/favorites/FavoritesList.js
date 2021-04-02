import React, { useEffect, useContext } from "react";
// import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FavoritesContext } from "./FavoritesProvider";
import { FavoriteCard } from "./FavoritesCard";
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

export const FavoritesList = () => {
    const classes = useStyles();

    const { favorites, getFavorites } = useContext(FavoritesContext)

     // Use effect envokes API call
     useEffect(() => {
        getFavorites()
    }, [])


    return (
        <>
            <div className={classes.cardContainer}>
                {favorites.map((favorite) => {
                    return <FavoriteCard key={`${favorite.gameId}--favCard`} game={favorite} />
                })}
            </div>

        </>
    )
};