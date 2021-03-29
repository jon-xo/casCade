import React from "react"
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../Cascade.css"
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    gameHeader: {
        fontWeight: "bold",
    },
    embedContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'stetch',
        justifyContent: 'center',
        justifyItems: 'stretch',
        height: '40rem',
        maxWidth: '100%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    embedSpan: {
        backgroundColor: 'var(--xiketic)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f5f5f5',
        height: '40rem',
        width: '90%',
        marginTop: theme.spacing(2),
        zIndex: 2,
    }
}))


export const BuildEmbed = ({ gameIdentifer }) => {
    const classes = useStyles();
    
    // Create URL using component prop

    // console.log(gameIdentifer.gameData);

    const playerId = gameIdentifer.gameData
    
    const queryURL = `https://archive.org/embed/${playerId}`

    // Build embedded iFrame element with  src attribute = queryURL
    const embedURL = `<iframe src="${queryURL}" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>`


    return (
        <>
        <div className={classes.embedContainer}>
            <div className={clsx(classes.root, classes.embedSpan)}>
                <div dangerouslySetInnerHTML={{ __html: embedURL }} />
            </div>
        </div>
        </>
    )
};