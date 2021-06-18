import React from "react"
import { Grid, Typography, Paper } from "@material-ui/core";
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
    iconText: {
        // Alternate text alignment
        display: 'flex-wrap',
        margin: theme.spacing(2),
        alignItems: 'stretch',
        justifyContent: 'center',
        textAlign: 'center'
    },
}))


// Favorites header banner Component

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
            </Grid>
        
        </>
    )
};


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
                        <Paper className={classes.titlePaper}>
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


export const Favorites = () => {

    return (
        <div>
            <FavoritesList />
        </div>
    )
};