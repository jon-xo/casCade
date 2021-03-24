import React, { useState , useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { Grid, Typography, Paper, IconButton, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { Favorite, Search, Shuffle, LocalLibrary, ExpandLess, ExpandMore} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { LibraryContext } from "./LibraryProvider";
import clsx from "clsx";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '16rem',
    },
    cardContainer: {
        width: theme.spacing(175),
        margin: theme.spacing(6),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: theme.spacing(35),
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.light,
        color: '#f5f5f5',
    },
    cardMedia: {
        height: 140,
        width: '100%',
    },
    cardButtonContainer: {
        alignItems: 'end',
    },
    margin: {
        margin: theme.spacing(2),
    },
    paper: {
        // Rectanglar blue-gray div
        width: theme.spacing(100),
        height: theme.spacing(20),
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
        display: 'flex-wrap',
        margin: theme.spacing(2),
        alignItems: 'stretch',
        justifyContent: 'center',
        textAlign: 'center'
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

export const LibraryList = () => {
    const { allGames , getArcadeTitles } = useContext(LibraryContext)
    
    const classes = useStyles();

    useEffect(() => {
        getArcadeTitles()
    }, [])

    console.log(allGames);

    return (
        <>
        <div className={classes.cardContainer}>

        {allGames.map(game => {
                return <>
                <Card className={classes.card}>
                    <CardMedia
                    className={classes.cardMedia}
                    image={`https://archive.org/services/img/${game.identifier}`}
                    title={game.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {game.title}
                        </Typography>
                        <List 
                            component="nav"
                            subheader={
                                <ListSubheader component="div" id={`${game.identifer}-list-subheader`}>
                                    Details
                                </ListSubheader>
                            }
                        
                        >
                            <ListItem >
                                <ListItemText primary="Release Year:" secondary={game.date} />
                            </ListItem>
                            <Divider />
                            <ListItem >
                                <ListItemText primary="Publisher:" secondary={game.creator} />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions>
                        <div className={classes.cardButtonContainer}>
                            <IconButton>
                                <Favorite />
                            </IconButton>
                        </div>
                    </CardActions>
                </Card>
            </>         
})}
        </div>
        </>
        
        
            
    )
    
};