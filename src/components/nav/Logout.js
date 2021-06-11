import React from "react"
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { PowerSettingsNew} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
    }
    },
    buttonLink: {
        textDecoration: 'none',
    },
  }));
  

export const LogoutButton = () => {
    const classes = useStyles();

    // const activeUserId = localStorage.getItem("cascade_user");

    const clearActiveUser = () => {
        localStorage.removeItem("cascade_user");
    };

    return (
        <div>
          <Link className={classes.buttonLink} to={"/"}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<PowerSettingsNew />}
                onClick={clearActiveUser}
              >
                Logout
              </Button>
          </Link>
        </div>
    )
    
};