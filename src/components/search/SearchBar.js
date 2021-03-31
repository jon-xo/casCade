import React, { useEffect, useContext, useState, useRef } from "react"
import { Typography, AppBar, Toolbar, InputBase, Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { fade , makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import { SearchFormatter } from "../StrManipulation";
import { SearchContext } from "./SearchProvider";
import { useHistory, useLocation } from "react-router";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    appBar: {
        backgroundColor: theme.palette.secondary.main,
        width: '80vw'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: '20%',
        }
    },
    searchContainer: {
        width: '95vw'
    },
    search: {
        display: 'flex',
        marginLeft: 0,
        justifyContent: 'start',
        justifyItems: 'space-evenly',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '100%',
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
        // width: '45%',
        [theme.breakpoints.up('sm')]: {
            width: '30vw',
            '&:focus': {
                width: '48vw',
            }
        },
        [theme.breakpoints.up('md')]: {
            width: '30vw',
            '&:focus': {
                width: '54vw',
            }
        },
        [theme.breakpoints.up('lg')]: {
            width: '30vw',
            '&:focus': {
                width: '62vw',
            }
        }
    },
    searchButton: {
        flexGrow: theme.spacing(1),
        padding: theme.spacing(1),
        position: 'relative',
        minWidth: '7rem',
        '&:focus': {
            fontWeight: 500,
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            minWidth: '5rem',
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(2),
            minWidth: '7rem',
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(1),
            minWidth: '7.5rem',
        },
    },
    modalText: {
        textAlign: 'center',
    }
}))

const QueryAlert = (props) => {
    const { onClose, open } = props;
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle className={classes.modalText}>Search</DialogTitle>
            <DialogContent dividers>
                <Typography className={classes.modalText} gutterBottom>Please enter a game title to search.</Typography>
            </DialogContent>
            <DialogContent dividers><Button variant="contained" color="secondary" onClick={handleClose} fullWidth>Close</Button></DialogContent>
        </Dialog>
    )
};


export const SearchBar = (props) => {
    const { getSearchResults } = useContext(SearchContext)
    const [ queryEvent, setQueryEvent ] = useState("");
    const [ outgoing, setOutgoing ] = useState(false)
    const searchRouter = useRef();
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if(outgoing === true) {
            getSearchResults(queryEvent)
            .then(() => {
                searchRouter.current = {
                pathname: `/search/results?_${queryEvent}`,
                
            }})            
            .then(() => {                           
                history.push(searchRouter.current)})
            .then(setOutgoing(false))
        }
    }, [outgoing])
    
    const handleSearchChange = (event) => {    
        // setQueryEvent(event.target.value)
        let formattedQuery = encodeURIComponent(event.target.value);
        setQueryEvent(formattedQuery)
    };

    const searchValueCheck = (locale) => {
        if (locale.includes("results?_")) {
            const valueArray = locale.split("results?_")
            return decodeURI(valueArray[0]) 
        }
    };

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

    return (
        <div className={classes.root}>
            <QueryAlert open={open} onClose={handleAlertClose} />
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
                            // inputProps={""}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <Button 
                        variant="contained"
                        id="searchSubmit"
                        color="primary" 
                        onClick={(e) => {
                            if(queryEvent === "") {
                                handleOpenConditional()
                            } else {
                                setOutgoing(true)
                            }                            
                        }} 
                        className={classes.searchButton}
                    >
                        Search
                    </Button>
                </Toolbar>   
            </AppBar>
        </div>
    )
};