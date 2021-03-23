import React, { useRef, useState } from "react"
import clsx from "clsx";
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, InputAdornment } from "@material-ui/core";
import { AccountCircle, Email } from "@material-ui/icons";
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
    }

}))

// Declare local component to display an alert modal when envoked
// Component accepts two props; function and boolean
const UserDupeAlert = (props) => {
    const { onClose, open } = props;
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle className={classes.dialog}>User not available</DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>An account with that email address already exists.</Typography>
            </DialogContent>
            <DialogContent dividers><Button variant="contained" color="secondary" onClick={handleClose} fullWidth>Close</Button></DialogContent>
        </Dialog>
    )
};

// Create register component whith FETCH and POST API calls,
// to verify and alert against duplicate users,
// and to create and sign in new users after required Form fields are completed.

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const verifyPassword = useRef()
    const conflictDialog = useRef()
    const history = useHistory()
    const classes = useStyles();

    // Declare inital state variable open as false
    const [ open , setOpen] = useState(false);
    
    // Function to update open boolean to true
    const handleOpenConditional = () => {
        setOpen(true)
    };

    // Function to update open boolean to false
    const handleAlertClose = () => {
        setOpen(false);
    }
    
    // API Call to expand email value from users table
    // and verify that user string has a value
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        
        // const consoleObject = {
        //     email: email.current.value,
        //     name: `${firstName.current.value} ${lastName.current.value}`,
        //     targetName: e.target.name,
        //     targetValue: e.target.value 
        // }
        
        // console.log(consoleObject);        

        // Conditional to post new user object to users table if value is true
        // if user exists, display modal.

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("cascade_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    handleOpenConditional()
                }
            })
        
    }

    
    return (
        <main style={{ textAlign: "center" }}>

            <UserDupeAlert open={open} onClose={handleAlertClose} />
            <Grid container spacing={1} alignItems="center" justify="center">
                <Grid item xs={1} sm={4} md={6}>
                    <Paper elevation={4}>
                        <section className="background-hero--div">
                        </section>
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={8} md={6}>
                    <form autoComplete="on" onSubmit={handleRegister}>
                        
                        <Typography variant="h3" gutterBottom>
                        Create your casCade account
                        </Typography>
                        <Grid >
                            <Grid item md={12}>
                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                    <fieldset>
                                        {/* <InputLabel htmlFor="firstName--input"> First Name </InputLabel> */}
                                        <TextField inputRef={firstName} type="text"
                                            variant="outlined"
                                            label="First Name"
                                            name="firstName"
                                            id="firstName--input"
                                            className="form-control form-register-name"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.InputAdornment} position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                )

                                            }}
                                            placeholder="First name" required autoFocus />
                                    </fieldset>
                                </FormControl>
                            </Grid>
                            <Grid item md={12}>
                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                    <fieldset>
                                        {/* <InputLabel htmlFor="lastName--input"> Last Name </InputLabel> */}
                                        <TextField inputRef={lastName} type="text"
                                            variant="outlined"
                                            label="Last Name"
                                            name="lastName"
                                            id="lastName--input"
                                            className="form-control form-register-name"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.InputAdornment} position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                )
                                            }}
                                            
                                            placeholder="Last name" required />
                                    </fieldset>
                                </FormControl>
                            </Grid>
                            <Grid item md={12}>
                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                    <fieldset>
                                        {/* <InputLabel htmlFor="inputEmail"> Email address </InputLabel> */}
                                        <TextField inputRef={email} type="email"
                                            variant="outlined"
                                            label="Email address"
                                            name="email"
                                            id="inputEmail"
                                            className="form-control form-register-name"
                                            placeholder="Email address"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.InputAdornment} position="start">
                                                        <Email />
                                                    </InputAdornment>
                                                )
                                            }}
                                            required />
                                    </fieldset>
                                </FormControl>
                            </Grid>
                            <fieldset>
                                <Button variant="contained" color="primary" type="submit"> Sign in </Button>
                            </fieldset>
                        </Grid>
                    
                    </form>
                </Grid>
            </Grid>
        </main>
    )
}

// 