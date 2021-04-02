import React, { useContext, useEffect }  from "react"
import { useHistory } from "react-router-dom";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { Search, Shuffle, LocalLibrary, } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { MiniSearchBar } from "./search/SearchBar";
import { RandomGame } from "./search/Shuffle";
import { LibraryContext } from "./library/LibraryProvider";
import clsx from "clsx";
import "./Cascade.css"
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
    getGamingContainer: {
        width: '100%',
        display: 'grid',
        // flexFlow: 'row wrap',
        padding: theme.spacing(2),
        justifyContent: 'center',
        alignContent: 'center',
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
    },
    yellowButton: {
        // Create yellow circular bubble for material-ui icons
        fontSize: '1rem',
        width: '12rem',
        fontWeight: 600,
        padding: theme.spacing(1),
        border: `solid ${theme.palette.warning.main}`,
        color: '#f5f5f5',
        backgroundColor: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        }        
    },

}))

// Basic home page export with stylized Getting Started paper container.
export const Home = () => {
    // API provider is received via useContext
    // and imported as deconstructed object.
    const { allGames, getArcadeTitles } = useContext(LibraryContext);

    const history = useHistory();

    // Use effect envokes API call
    useEffect(() => {
        getArcadeTitles(300)
    }, [])
    
    
    const classes = useStyles();
    return <>
        <Grid
            container
            direction="row"
            justify="center"
        >
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
            <Paper variant="outlined" className={clsx(classes.paper)} >
                <Grid
                    container
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Typography variant="h4"  align="center">Get Gaming</Typography>
                    </Grid>
                    <Grid item xs={12}>                        
                        <MiniSearchBar />
                    </Grid>
                    <Grid item xs={12}>                        
                        <div className={classes.iconSpan}>
                        <Typography className={classes.iconText}>Or</Typography>                                                    
                        </div>
                    </Grid>
                    <Grid item md={12}>                        
                            <div className={classes.iconSpan}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={classes.yellowButton}
                                    startIcon={<Shuffle />}
                                    onClick={() => {
                                        RandomGame(allGames, history)
                                    }}
                                >
                                    Shuffle
                                </Button>
                            </div>                       
                    </Grid>

                                               
                </Grid>
            </Paper>
        </Grid>
        </>
};