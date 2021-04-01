import React, { useState } from "react"
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FavoritesList } from "./FavoritesList";
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
    }
}))

export const Favorites = () => {
    const classes = useStyles();

    return (
        <div classes={classes.root}>
            <Grid
                container 
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid item xs={10}>
                    <FavoritesList />
                </Grid>
            </Grid>
        </div>
    )
};