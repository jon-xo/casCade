import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// Declare local variable to import material-ui styles and declare css overrides

const useStyles = makeStyles((theme) => ({
    logoRed: { 
        color: theme.palette.error.main,
        fontWeight: 400,
    },
    logoGreen: {
        color: theme.palette.success.main,
        fontWeight: 400,
    },
    logoYellow: {
        color: theme.palette.warning.main,
        fontWeight: 400,
    },
    logoText: {
        fontWeight: 300,
    },
    logoContainer: {
        display: 'flex',
        width: 'auto',
    }
}))

// Declare LogoLarge component to export larger stylized logo
export const LogoLarge = () => {
    const classes = useStyles();

    return (
        <>
        <div className={classes.logoContainer}>
            <Typography variant="h2" className={classes.logoRed}>c</Typography>
            <Typography variant="h2" className={classes.logoGreen}>a</Typography>
            <Typography variant="h2" className={classes.logoYellow}>s</Typography>
            <Typography variant="h2" className={classes.logoText}>Cade</Typography>
        </div>
        </>
    )
};

// Declare LogoLarge component to export smaller stylized logo
export const LogoSmall = () => {
    const classes = useStyles();

    return (
        <>
        <Typography variant="h5" className={classes.logoRed}>c</Typography>
        <Typography variant="h5" className={classes.logoGreen}>a</Typography>
        <Typography variant="h5" className={classes.logoYellow}>s</Typography>
        <Typography variant="h5" className={classes.logoText}>Cade</Typography>
        </>
    )
};