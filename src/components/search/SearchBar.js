import React, { useEffect, useContext } from "react"
import { Grid, Typography, Paper, AppBar, Toolbar, IconButton, InputBase } from "@material-ui/core";
import { fade , makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    appBar: {
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            width: '30%',
        }
    },
    search: {
        position: 'flex',
        marginLeft: 0,
        marginRight: '15vw',
        justifyContent: 'center',
        justifyItems: 'center',
        // alignContent: 'center',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {            
            backgroundColor: fade(theme.palette.secondary.dark, 0.25),
        }
    },
    searchIcon: {
        margin: theme.spacing(-1.8, 0),
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputText: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40vw',
            '&:focus': {
                width: '65vw',
            }
        }
    }
}))

export const SearchBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="relative" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h5" noWrap>
                        Search
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                        <InputBase
                            placeholder="Find games..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputText,
                            }}
                            inputProps={""}
                        />
                    </div>
                </Toolbar>   
            </AppBar>
        </div>
    )
};