import React from "react"
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Cascade.css"
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(2),
    },
    paper: {
        width: theme.spacing(20),
        height: theme.spacing(10),
        padding: theme.spacing(1)
    }
}))


export const Home = () => {
    
    const classes = useStyles();
    return <>
        <Paper variant="outlined" className={clsx(classes.margin, classes.paper)} square>
            
                
                    <Typography variant="h4">Welcome</Typography>                    
                
                
                    <Typography>Get to gaming!</Typography>
                
            
        </Paper>
        </>
};