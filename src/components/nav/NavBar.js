import React, { useState } from "react"
import clsx from "clsx";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Tabs, Tab } from "@material-ui/core";

// Declare local variable to declare custom css for material-ui components

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        
    },
    margin: {
        margin: theme.spacing(1),
    },
    navPaper: {
        textAlign: 'center',
        color: theme.palette.text.primary
    }
}))


// Declare array of all render paths used in NavBar element

const navList = ["/", "/library", "/favorites", "/search"];

// ActiveTab component reads the current browser URL path and returns 
// the matching index interger

const ActiveTab = () => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const locationIndex = navList.indexOf(currentLocation);
    return locationIndex;
};

// NavBar component sets state variable of value
// to the index returned by ActiveTab, once JSX is rendered
// Tabs element adds the handleNavChange function to an event listner,
// handleNavChage updates state with the newNavValue and
// NavBar reflects the active tag accordingly.

export const NavBar = () => {
    const [ value , setValue ] = useState(ActiveTab());

    const history = useHistory();
    const classes = useStyles();
    
    const handleNavChange = (e, newNavValue) => {
        
        setValue(newNavValue)
        history.push(navList[newNavValue])

    }

    return (
        <>
        <Grid container
        direction="row"
        justify="flex-start"
        alignItems="center">

        <Grid item lg={12}>
            <Paper variant="none" elevation={0} className={clsx(classes.root, classes.margin)}>
                <Typography variant="h2" gutterBottom>casCade</Typography>
            </Paper>
        </Grid>
        <Grid item lg={12}>
            <Grid container justify="center">
                <Grid item lg={12}>                   
                    <Paper elevation={2} className={clsx(classes.navPaper)}>
                        <Tabs
                        value={value}
                        indicatorColor="primary"
                        onChange={handleNavChange}
                        className={clsx(classes.navPaper)}
                        centered
                        >
                            {/* Map method is called on the NavList array
                                The forward slash (/) is removed from each
                                array item, if the labelName variable equals
                                and empty string, a Tab is returned
                                for the Home (/) path.
                            */}
                        {navList.map((m) => {
                            const labelName = m.replace('/', '');
                            if (labelName === "") {
                                return <Tab label="home" />
                            } else {
                                return <Tab label={labelName} />
                            }
                        })}
                        </Tabs>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
        </>
    )
};