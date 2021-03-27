import React from "react"
import { useParams, useHistory } from "react-router-dom";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BuildEmbed } from "./EmbedPlayer";
import "../Cascade.css"
import clsx from "clsx";

// Declare variable to import material-ui components and specify local theme overrides 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    gameHeader: {
        fontWeight: "bold",
    },
    gameContainer: {
        color: '#f5f5f5',
        height: '60vh',
        minHeight: '45rem',
        minWidth: '52rem',
        marginTop: theme.spacing(10),
        zIndex: 1,
    }
}))

export const GameContainer = ({ gameProp }) => {
    const classes = useStyles();
    const params = useParams();

    // const gameData = this.props.location;
    // const gameId = this.props.location.gameId;


    console.log(params);

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
                        <Typography variant="h4" component="h2" align="center">Player</Typography>
                        <BuildEmbed gameIdentifer={params}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        </>
    )
};