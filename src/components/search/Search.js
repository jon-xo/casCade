import React, { useEffect, useContext } from "react"
import { Grid, Typography, Paper } from "@material-ui/core";
import { fade , makeStyles } from "@material-ui/core/styles";
import { truncate , cardTitle, releaseDate } from "../StrManipulation";
import { SearchBar } from "./SearchBar";
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
    searchContainer: {        
    }
}))

export const Search = () => {
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
                        <SearchBar />
                    </Grid>
                </Grid>
            </div>
        </>
    )
};
