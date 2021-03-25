import React, { useState , useEffect } from "react";
import { Typography, IconButton, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, List, ListItem, ListItemText, ListItemIcon, Collapse } from "@material-ui/core";
import { Favorite, Search, Shuffle, Subject, Label, ExpandLess, ExpandMore } from "@material-ui/icons";
import { truncate , cardTitle } from "../StrManipulation";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '16rem',
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
    cardStyle: {
        // Primary theme for rendered game cards
        width: theme.spacing(40),
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
        // Set default height for card header
        marginTop: theme.spacing(1),
        height: theme.spacing(10),
        textAlign: 'center',
    },
    cardHeader: {
        // Card header font style
        fontWeight: "bold",
    },

    cardMedia: {
        // Default styles for card images 
        paddingTop: "15.5%",
        height: 160,
        width: '100%',
    },
    cardButtonContainer: {
        // Container to anchor card buttons to bottom
        display: 'grid',
        height: theme.spacing(12),
        alignContent: 'end',
        alignItems: 'end',
    },
    cardDivider: {
        margin: `${theme.spacing(3)}px 0`
    },
    margin: {
        margin: theme.spacing(2),
    },
    genreContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    genreTag: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: theme.spacing(5),
        minWidth: '40%',
        maxWidth: '100%',
        border: `.1rem solid #f5f5f5`,
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '.5rem',
        fontWeight: 300,
        marginBottom: theme.spacing(1),
    },
    uncategorizedTag: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: theme.spacing(5),
        width: theme.spacing(20),
        border: `.1rem solid #f5f5f5`,
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '.5rem',
        fontWeight: 300,
        marginBottom: theme.spacing(1),
    },
    tagText: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        fontSize: 15,
        textAlign: 'left',
    },
    tagIcon: {
        marginLeft: theme.spacing(2),
        fontSize: 20,
        textAlign: 'left',
    },
    nested: {
        paddingLeft: theme.spacing(4),
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


export const LibraryCard = ({ game }) => {
    const [ open, setOpen ] = useState(false);

    const handleCardDetails = () => {
        setOpen(!open);
    };
    
    const classes = useStyles();

    return  <>

            <Card className={classes.cardStyle} key={game.identifier}>
                    <CardMedia
                    className={classes.cardMedia}
                    image={`https://archive.org/services/img/${game.identifier}`}
                    title={cardTitle(game.title, 44)}
                    />
                    <CardContent>
                        <div className={classes.cardHeaderSpan}>
                            <Typography className={classes.cardHeader}  variant="h5" component="h2" gutterBottom>
                                {cardTitle(game.title, 41)}
                            </Typography>
                        </div>
                        <div className={classes.genreContainer}>
                            {!game.genre ? <div className={classes.uncategorizedTag}>
                                <Label className={classes.tagIcon} /><Typography className={classes.tagText} variant="body1" component="p">Uncategorized</Typography>
                            </div>:<div className={classes.genreTag}>
                                <Label className={classes.tagIcon} /><Typography className={classes.tagText} variant="body1" component="p">{truncate(game.genre, 22)}</Typography>
                            </div>}
                        </div>
                        <Divider className={classes.cardDivider} />
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
                                    <ListItem key={`${game.identifier}--year-header`}className={classes.nested}>
                                        <ListItemText primary="Release Year" secondary={game.date} />
                                    </ListItem>
                                    <ListItem key={`${game.identifier}--publisher-header`}className={classes.nested}>
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
    
};