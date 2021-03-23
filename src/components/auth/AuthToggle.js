import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ToggleButton , ToggleButtonGroup } from "@material-ui/lab";

// Declare local variable to declare custom css for material-ui components
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(2),
    }

}))


export const UserAuthToggle = () => {
    
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [ userToggle, setUserToggle ] = useState('login');

    const handleUserToggle = (e) => {
        console.log(location.pathname);
        setUserToggle(e.target.innerHTML)
    };

    return (
        <ToggleButtonGroup
            value={userToggle}            
            exclusive
            onClick={handleUserToggle}
            className={classes.margin}            
        >
                <ToggleButton value="login" onClick={() => {history.push("/login")}}>
                    Login
                </ToggleButton>
                <ToggleButton value="register" onClick={() => {history.push("/register")}}>
                    Register
                </ToggleButton>
        </ToggleButtonGroup>
    )
};
