import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom";
import { IconButton, Button, Grid, Typography, Paper, List, ListSubheader, ListItem, ListItemText, Collapse, ListItemIcon } from "@material-ui/core";
import { VolumeOff, VolumeUp, Subject, ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { truncateSimple, releaseDate } from "../StrManipulation";
import { ControllerListner, DisconnectListner } from "./ControllerHandler";
import { BuildEmbed } from "./EmbedPlayer";
import { useSnackbar } from 'notistack';
import clsx from "clsx";
import "../Cascade.css"

// Declare variable to import material-ui components and specify local theme overrides 

const useStyles = makeStyles((theme) => ({
    // Universal Spacing for Player view
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    //  Player header spacing
    gameHeader: {
        fontWeight: "bold",
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    // Primary game container div
    // Gradiant color set by Cascade.css
    gameContainer: {
        color: '#f5f5f5',
        minHeight: '45rem',
        height: '60%',
        minWidth: '52rem',
        width: '95%',
        marginTop: theme.spacing(10),
        zIndex: 1,
    },
    // Details list container
    listSpan: {
        marginTop: theme.spacing(5),
        overflow: 'auto',
        height: theme.spacing(16),
    },
    // Details list header
    detailsListHeader: {
        fontWeight: 400,
        color: '#f5f5f5',

    },
    // Nested List > Indent Level 1 spacing
    nestedDetails: {
        marginLeft: theme.spacing(6),
        maxWidth: '90%'
    },
    // // Nested List > Indent Level 1 text
    nestedText: {
        fontWeight: 200,
        color: '#f5f5f5'
    },
    // Nested List > Indent Level 2 spacing
    nestedDetailChild: {
        marginLeft: theme.spacing(12),
        maxWidth: '80%'
    },
    // Nested List > Indent Level 1 text
    nestedDetailChildText: {
        color: '#f5f5f5'
    }
}))

// Game Data Function uses functions imported from StrManipulation.js,
// once releaseDate & genre are processed, returns updated object.

const GameData = ( gameProps ) => { 
    
    const gameDate = () => {
        if(!gameProps.releaseDate) {
            return "N/A" 
        } else {
            return releaseDate(gameProps.releaseDate); 
        }
    }    
    const gameGenre = () => {
        if (!gameProps.genre) {
            return "Uncategorized";
        } else {
            return gameProps.genre;
        }
    }

    return {
        gameId: gameProps.gameId,
        title: gameProps.title,
        releaseDate: gameDate(),
        genre: gameGenre(),
        imgPath: gameProps.imgPath,
    }

}

// Dynamic details list function
const DetailListItems = ( {detailObject} ) => {
    // Unique state declared for each list child element.
    const [ selectedDetail, setSelectedDetail ] = useState("");
    const classes = useStyles();

    // Function called onClick for each list item
    // If index added during map matches selected detail,
    // Update selectedDetail variable in state.

    const expandListItem = (index) => {
        if (selectedDetail === index) {            
            setSelectedDetail("")
        } else {            
            setSelectedDetail(index)
        }
    };

    // State declared for List parenet element
    const [ open, setOpen ] = useState(false);

    // Function is envoked by Details button event listner
    const handleDetails = () => {
        setOpen(!open);
    };

    // Switch case function to convert object key to string
    const listTextSwitch = (text) => {
        switch (text) {
            case 'title':
                return 'Title';
            case 'releaseDate':
                return 'Release Date';
            case 'genre':
                return 'Genre';
            case 'note':
                return 'Notes';
            default:
                break;
        }
    };

    return (
        <List
            component="nav"
            className={classes.listSpan}
        >
            <ListItem
                key={ListSubheader}
                button
                onClick={handleDetails}            
            >
                {/* List Parent element with Icon and Text*/}
                <ListItemIcon className={classes.detailsListHeader}>
                    <Subject />
                </ListItemIcon>
                <ListItemText primary="Details"  className={classes.detailsListHeader}/>
                {open ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>

            {/* Function sorts object and returns keys matched in filter,
                results returned are mapped and returned as collapsable parent/child list items */}

            {Object.keys(detailObject).filter(detail => detail === "title" || detail === "releaseDate" || detail === "genre").map((key, index) => {
                      
                return  (
                    <List>
                        <ListItem
                          key={index}
                          button
                          onClick={() => {
                            expandListItem(index)
                          }}
                          className={classes.nestedDetails}
                        >
                        <ListItemText primary={listTextSwitch(key)} key={index} />
                            {index === selectedDetail ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={index === selectedDetail} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem className={classes.nestedDetailChild}>
                                    <ListItemText className={classes.nestedDetailChildText} primary={detailObject[key]}/>                                    
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                )

            })}
            </Collapse>
        </List>
    )
};

export const GameContainer = ( props ) => {
    const classes = useStyles();
    const params = useParams();
    const location = useLocation();
    const [ soundState, setSoundState ] = useState(false);

    // The object passed via react-router-dom in the LibraryCard state
    // is processed by the GameData component and returned to variable.
    const activeGameData = GameData(location.state)
    
    // The Player container is rendered, 
    // BuildEmebed receives the activeGameData object as prop.

    ControllerListner();
    DisconnectListner();

    // const [ controllerConnect, setControllerConnect ] = useState(false);
    
    // useEffect(() => {
    //     window.addEventListener('gamepadconnected', (e) => {
    //             console.log(e);
    //             enqueueSnackbar(`${e.gamepad.id} connected`, { variant: "info" });
    //             setControllerConnect(true)                                       
    //     })
    // }, [])

    const checkCookie = (name) => {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");
        
        // Loop through the array elements
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            
            /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
            if(name == cookiePair[0].trim()) {
                // If found return true
                return true;
            }
        }
        
        // Return null if not found
        return false;
    };

    return (
        <>
        <div className={classes.root}>
            <Grid 
            container 
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
            >
                <Grid item xs={10}>
                    <Paper elevation={0} variant="outlined" className={clsx(classes.gameContainer, 'gameContainer')}>
                        <Typography variant="h4" component="h2" align="center" className={classes.gameHeader}>{activeGameData.title}</Typography>
                        {!soundState ? 
                        
                        <IconButton
                            variant="contained"
                            color="secondary"
                            // className={classes.button}                            
                            onClick={() => {
                                
                                var e = checkCookie("unmute");
                                // if (this.emulator)
                                //     this.emulator.setMute(!e);
                                // else {
                                //     var n = Object(I.b)("jw6");
                                //     if (n) {
                                //         var a = n.getVolume();
                                //         a ? (t.mute_click_prior_volume = a,
                                //         n.setVolume(0)) : n.setVolume(void 0 === t.mute_click_prior_volume ? 100 : t.mute_click_prior_volume)
                                //     }
                                // }
                                // return Object(r.a)("#theatre-ia .iconochive-mute, #theatre-ia .iconochive-unmute").toggle(),
                                e ? document.cookie = "unmute=1; domain=archive.org; path=/; SameSite=None"
                                : document.cookie = "unmute=; domain=archive.org; path=/; SameSite=None"
                                // console.log(e);
                                setSoundState(!soundState);
                            }}
                        >
                            <VolumeOff />
                        </IconButton>
                        :
                        <IconButton
                            variant="contained"
                            color="secondary"
                            // className={classes.button}
                            onClick={() => {
                                
                                var e = checkCookie("unmute");
                                // if (this.emulator)
                                //     this.emulator.setMute(!e);
                                // else {
                                //     var n = Object(I.b)("jw6");
                                //     if (n) {
                                //         var a = n.getVolume();
                                //         a ? (t.mute_click_prior_volume = a,
                                //         n.setVolume(0)) : n.setVolume(void 0 === t.mute_click_prior_volume ? 100 : t.mute_click_prior_volume)
                                //     }
                                // }
                                // return Object(r.a)("#theatre-ia .iconochive-mute, #theatre-ia .iconochive-unmute").toggle(),
                                e ? document.cookie = "unmute=1; domain=archive.org; path=/; SameSite=None"
                                : document.cookie = "unmute=; domain=archive.org; path=/; SameSite=None"
                                // console.log(e);
                                setSoundState(!soundState);
                            }}
                        >
                            <VolumeUp />
                        </IconButton>
                        }
                        <BuildEmbed gameIdentifer={params}/>
                        <DetailListItems detailObject={activeGameData} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
        </>
    )
};