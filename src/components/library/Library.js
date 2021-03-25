import React, { useState , useEffect, useContext } from "react";
import { Grid, Typography, Paper, IconButton, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, List, ListItem, ListItemText, ListItemIcon, Collapse } from "@material-ui/core";
import { Favorite, Search, Shuffle, LocalLibrary, Subject, Label, ExpandLess, ExpandMore} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { LibraryContext } from "./LibraryProvider";
import clsx from "clsx";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '16rem',
    },
    cardContainer: {
        // Styles for div which holds all rendered game cards
        width: theme.spacing(175),
        margin: theme.spacing(6),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardStyle: {
        // Primary theme for rendered game cards
        width: theme.spacing(35),
        height: 600,
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.light,
        color: '#f5f5f5',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
    },
    cardHeaderSpan: {
        margin: theme.spacing(1),
        height: theme.spacing(10),
    },
    cardHeader: {
        fontWeight: "bold",
    },

    cardMedia: {
        paddingTop: "15.5%",
        height: 160,
        width: '100%',
    },
    cardButtonContainer: {
        alignItems: 'end',
    },
    cardDivider: {
        margin: `${theme.spacing(3)}px 0`
    },
    margin: {
        margin: theme.spacing(2),
    },
    genreTag: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: theme.spacing(5),
        minWidth: theme.spacing(15),
        maxWidth: theme.spacing(30),
        border: `.1rem solid #f5f5f5`,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: '.8rem',
        fontWeight: 300,
        marginBottom: theme.spacing(2),
    },
    tagText: {
        marginLeft: theme.spacing(2),
        fontSize: 15,
    },
    tagIcon: {
        marginLeft: theme.spacing(2),
        fontSize: 20,
    },
    paper: {
        // Rectanglar blue-gray div
        width: theme.spacing(100),
        height: theme.spacing(15),
        padding: theme.spacing(1),
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        color: '#f5f5f5',
    },
    nested: {
        paddingLeft: theme.spacing(4),
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
        fontSize: '1.5rem',
        padding: theme.spacing(.5),
        borderRadius: '50%',
        border: 'solid',
        backgroundColor: theme.palette.secondary.light,
    },
    redIcon: {
        // Create red circular bubble for material-ui icons
        fontSize: '1.5rem',
        padding: theme.spacing(.5),
        // border: `solid ${theme.palette.error.dark}`,
        // backgroundColor: theme.palette.error.dark,
        // borderRadius: '50%',
        color: '#f5f5f5',
        "&:hover": {
            color: theme.palette.error.main,
        }

    },
    yellowIcon: {
        // Create yellow circular bubble for material-ui icons
        fontSize: '1.5rem',
        padding: theme.spacing(.5),
        border: `solid ${theme.palette.warning.main}`,
        backgroundColor: theme.palette.warning.main,
        borderRadius: '50%',
        color: '#f5f5f5',
    },
    blueIcon: {
        // Create blue circular bubble for material-ui icons
        fontSize: '1.5rem',
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
    const [ open, setOpen ] = useState(false);

    const handleCardDetails = () => {
        setOpen(!open);
    };

    useEffect(() => {
        getArcadeTitles()
    }, [])

    // console.log(allGames);

    return (
        <>
        <div className={classes.cardContainer}>

        {allGames.map(game => {
                const cardTitle = game.title.replace(/ *\([^)]*\) */g, '').replace('Internet Arcade:', '')
                return <>
                <Card className={classes.cardStyle}>
                    <CardMedia
                    className={classes.cardMedia}
                    image={`https://archive.org/services/img/${game.identifier}`}
                    title={game.title}
                    />
                    <CardContent>
                        <div className={classes.cardHeaderSpan}>
                            <Typography className={classes.cardHeader}  variant="h5" component="h2" gutterBottom>
                                {cardTitle}
                            </Typography>
                        </div>
                        {!game.genre ? <div className={classes.genreTag}>
                            <Label className={classes.tagIcon} /><Typography className={classes.tagText} variant="body1" component="p">Uncategorized</Typography>
                        </div>:<div className={classes.genreTag}>
                            <Label className={classes.tagIcon} /><Typography className={classes.tagText} variant="body1" component="p">{game.genre}</Typography>
                        </div>}
                        
                        <List component="nav" disablePadding>
                            <ListItem button onClick={handleCardDetails}>
                                <ListItemIcon>
                                    <Subject />
                                </ListItemIcon>
                                <ListItemText primary="Details" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nested}>
                                        <ListItemText primary="Release Year" secondary={game.date} />
                                    </ListItem>
                                    <ListItem className={classes.nested}>
                                        <ListItemText primary="Publisher" secondary={game.creator} />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </CardContent>
                    <CardActions>
                        <div className={classes.cardButtonContainer}>
                            <IconButton>
                                <Favorite className={classes.redIcon}/>
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