import React from "react"
import { Grid, Typography, Paper } from "@material-ui/core";
import { Search, Shuffle, LocalLibrary } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "./Cascade.css"
import clsx from "clsx";
// import { SearchIcon } from "./IconLib";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(2),
    },
    paper: {
        // Rectanglar blue div
        width: theme.spacing(75),
        height: theme.spacing(50),
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        color: '#f5f5f5',
    },
    iconSpan: {
        // Style set to align icon and text
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1)
    },
    iconText: {
        // Alternate text alignment
        display: 'inline-flex',
        fontSize: 'large',
        margin: theme.spacing(2),
        alignItems: 'stretch',
    },
    iconStyle: {
        // Basic color styles to border material-ui in blue-grey circular bubble
        fontSize: '2rem',
        padding: theme.spacing(.5),
        borderRadius: '50%',
        border: 'solid',
        backgroundColor: theme.palette.secondary.light,
    },
    redIcon: {
        // Create red circular bubble for material-ui icons
        fontSize: '2rem',
        padding: theme.spacing(.5),
        border: `solid ${theme.palette.error.dark}`,
        backgroundColor: theme.palette.error.dark,
        borderRadius: '50%',
        color: '#f5f5f5'
    },
    yellowIcon: {
        // Create yellow circular bubble for material-ui icons
        fontSize: '2rem',
        padding: theme.spacing(.5),
        border: `solid ${theme.palette.warning.main}`,
        backgroundColor: theme.palette.warning.main,
        borderRadius: '50%',
        color: '#f5f5f5',
    },
    blueIcon: {
        // Create blue circular bubble for material-ui icons
        fontSize: '2rem',
        padding: theme.spacing(.5),
        border: `solid ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: '50%',
        color: '#f5f5f5',
    }

}))

// Basic home page export with stylized Getting Started paper container.
export const Home = () => {
    
    const classes = useStyles();
    return <>
        <Paper variant="outlined" className={clsx(classes.paper)} >
            <Grid 
                container
                direction="row"
                justify="center"
            >
                <Grid item md={12}>
                    <Typography variant="h4"  align="center">Get Started</Typography>
                </Grid>
                <Grid item md={12}>
                    <Grid container>
                        <div className={classes.iconSpan}>
                            <Search className={classes.redIcon}/><Typography className={classes.iconText}>Search and find a game.</Typography>
                        </div>
                        <div className={classes.iconSpan}>
                            <Shuffle className={classes.yellowIcon}/><Typography className={classes.iconText}>Use the shuffle button to mix-it up and find your new favorite.</Typography>
                        </div>
                        <div className={classes.iconSpan}>
                            <LocalLibrary className={classes.blueIcon}/><Typography className={classes.iconText}>Select the Library to view all available titles.</Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
        </>
};