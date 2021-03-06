import React, { useRef, useState } from "react"
import PropTypes from 'prop-types';
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, InputAdornment } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { UserAuthToggle } from "./AuthToggle";
import { LogoLarge } from "../Logo";
import "./Login.css"

// Declare local variable to declare custom css for material-ui components
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25rem',
    },
    InputAdornment: {
        color: theme.palette.primary.main,
    },
    dialog: {
        textAlign: 'center',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    heroImgBackground: {
        color: '#011703',
    }
}))

// Declare local component to display an alert modal when envoked
// Component accepts two props; function and boolean
const ModalAlert = (props) => {
    const { onClose, open } = props;
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle className={classes.dialog}>User not found</DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>Check spelling and try again.</Typography>
            </DialogContent>
            <DialogContent dividers><Button variant="contained" color="secondary" onClick={handleClose} fullWidth>Close</Button></DialogContent>
        </Dialog>
    )
};

// Declare required propTypes on Modals [***]
ModalAlert.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}


// Create Login component with API calls to check for an existing user in the database
// & conditional to check TextField value against database table and display ModalAlert,
// if user is not registered.

export const Login = props => {
    const email = useRef()
    // const password = useRef()
    // const existDialog = useRef()
    const history = useHistory()
    const classes = useStyles();

    // Declare state variable open as false
    const [ open , setOpen] = useState(false);
    
    // Function to update open boolean to true
    const handleOpenConditional = () => {
        setOpen(true)
    };

    // Function to update open boolean to false
    const handleAlertClose = () => {
        setOpen(false);
    }
    
    
    
    const existingUserCheck = () => {
        return fetch(`https://cascade-app-database.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("cascade_user", exists.id)
                    history.push("/")
                } else {
                    handleOpenConditional()
                }
            })
    }

    // Login page is rendered with ModalAlert and ToggleButton components
    return (
        <main className="container--login">
            <ModalAlert open={open} onClose={handleAlertClose} />
            <Grid container spacing={1} alignItems="center" justify="center">
                <Grid item xs={2} sm={4} md={6}>
                    <Paper className={classes.heroImgBackground} elevation={6}>
                        <section className="background-hero--div">
                            <div className="background-hero"></div>
                        </section>
                    </Paper>
                </Grid>
                <Grid item xs={10} sm={8} md={6}>
                    <section className="form--container">
                        <form onSubmit={handleLogin}>
                            <div className={classes.logoContainer}>
                                <LogoLarge />
                            </div>
                            <UserAuthToggle gutterBottom/>
                            <Typography variant="h5" gutterBottom>
                                Sign in to get started
                            </Typography>
                            <fieldset>
                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                    {/* <InputLabel htmlFor="inputEmail"> Email address </InputLabel> */}
                                    <TextField inputRef={email} type="email"
                                        variant="outlined"
                                        label="Email address"
                                        id="inputEmail"
                                        className="form-control form-register-name"
                                        placeholder="Email address"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className={classes.InputAdornment} position="start">
                                                    <AccountCircle />
                                                </InputAdornment>                                            
                                            )
                                        }}                                        
                                        required autoFocus />
                                </FormControl>
                            </fieldset>
                            <fieldset>
                                <Button className="buttonLoginRegister" variant="contained" color="primary" type="submit">
                                    Sign in
                                </Button>
                            </fieldset>
                        </form>
                    </section>
                    <section className="link--register">
                        <Link to="/register" className="buttonLink">
                            <Button className="buttonLoginRegister" variant="contained" color="secondary">
                                Not a member yet?
                            </Button>
                        </Link>
                    </section>
                </Grid>
            </Grid>
        </main>
    )
}

