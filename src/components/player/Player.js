import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom";
import { Grid, Typography, Paper, List, ListSubheader, ListItem, ListItemText, Collapse, ListItemIcon } from "@material-ui/core";
import { Subject, ExpandLess, ExpandMore } from "@material-ui/icons";
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
                        <BuildEmbed gameIdentifer={params}/>
                        <DetailListItems detailObject={activeGameData} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
        </>
    )
};