import React, { useState } from "react"
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Grid, Typography, Paper, List, ListSubheader, ListItem, ListItemText, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BuildEmbed } from "./EmbedPlayer";
import { truncate , cardTitle, releaseDate } from "../StrManipulation";
import "../Cascade.css"
import clsx from "clsx";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

// Declare variable to import material-ui components and specify local theme overrides 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    gameHeader: {
        fontWeight: "bold",
        marginTop: theme.spacing(2),
    },
    gameContainer: {
        color: '#f5f5f5',
        height: '60vh',
        minHeight: '45rem',
        minWidth: '52rem',
        marginTop: theme.spacing(10),
        zIndex: 1,
    },
    listSpan: {
        marginTop: theme.spacing(5),
        overflow: 'auto',
        maxHeight: '10rem',
    }
}))

const GameData = ( gameProps ) => { 
    console.log(gameProps);
    
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

const DetailListItems = ( {detailObject} ) => {
    const [ selectedDetail, setSelectedDetail ] = useState("");
    const classes = useStyles();

    const expandListItem = (index) => {
        if (selectedDetail === index) {
            setSelectedDetail("")
        } else {
            setSelectedDetail(index)
        }
    };

    return (
        <List
            component="nav"
            className={classes.listSpan}
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Details
                </ListSubheader>
            }
        >
            {Object.keys(detailObject).map((key, index) => {
                console.log(key, index);                            
                return  (
                    <List>
                        <ListItem
                          key={index}
                          button
                          onClick={() => {
                            expandListItem(index)
                          }}
                        >
                        <ListItemText primary={key} key={index} />
                            {index === selectedDetail ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={index === selectedDetail} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText primary={detailObject.key}/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                )

            })}
        </List>
    )
};

export const GameContainer = ( props ) => {
    const classes = useStyles();
    const params = useParams();
    const location = useLocation();

    // const gameData = this.props.location;
    // const gameId = this.props.location.gameId;


    const activeGameData = GameData(location.state)

    console.log(activeGameData);
    

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