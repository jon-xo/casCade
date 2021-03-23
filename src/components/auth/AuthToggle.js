import React, { useState } from "react"
import clsx from "clsx";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ToggleButton , ToggleButtonGroup } from "@material-ui/lab";

// Declare local variable to declare custom CSS to style toggle button display, margin, and background-color

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(2),
    },
    toggleColor: {
        backgroundColor: theme.palette.secondary.main,
    }

}))

// Export toggle button component
// conditional utilizes material-ui syntax for onChange event
// active toggle state is set by useLocation function from current
// URL path; when if condition is met, new page is rendered.

export const UserAuthToggle = () => {
    
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    
    const currentLocation = location.pathname.replace('/', '')
    const [ userToggle, setUserToggle ] = useState(currentLocation);

    const handleUserToggle = (e, newToggle) => {
        // console.log(location.pathname);
        setUserToggle(newToggle)
        if (newToggle === "login") {
            history.push("/login")
        } else if (newToggle === "register") {
            history.push("/register")
        }
    };

    // Toggle button text color is set using style attribute.

    return (
        <ToggleButtonGroup
            value={userToggle}            
            exclusive
            onChange={handleUserToggle}
            className={clsx(classes.margin, classes.toggleColor)}                      
        >
                <ToggleButton value="login" style={{color: 'white'}}>
                    Login
                </ToggleButton>
                <ToggleButton value="register" style={{color: 'white'}}>
                    Register
                </ToggleButton>
        </ToggleButtonGroup>
    )
};
