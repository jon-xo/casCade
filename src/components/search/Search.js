import React from "react"
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SearchBar } from "./SearchBar";
import "../Cascade.css";
import clsx from "clsx"


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
        minWidth: '50vw',
        maxWidth: '95vw',
    }
}))

// Search component is the parent container for SearchBar and provides Grid layout to position element.
export const Search = () => {
    const classes = useStyles();
    
    return (
        <>
            <div>
                <Grid
                    container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    className={clsx(classes.searchContainer)}
                >
                    <Grid item xs={10}>
                        <SearchBar />
                    </Grid>
                </Grid>
            </div>
        </>
    )
};