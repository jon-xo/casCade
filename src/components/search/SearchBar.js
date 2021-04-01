import React, { useEffect, useContext, useState, useRef } from "react"
import { Typography, AppBar, Toolbar, InputBase, Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { fade , makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import { SearchContext } from "./SearchProvider";
import { useHistory, useLocation } from "react-router";

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    // Parent container for appBar
    searchContainer: {
        width: '95vw'
    },
    // Div element used to build SearchBar
    appBar: {
        backgroundColor: theme.palette.secondary.main,
        width: '80vw'
    },
    // Left justified title for SearchBar
    // Breakpoint sets title block to hidden when
    // SearchBar is minimized.
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
    // SearchBar class provides positioning and colors
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
    // SearchIcon dislayed in Iput field
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
    // InputText field dynamically resizes inherit of
    // current breakpoint.
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
    // searchButton styles set position, color, and breakpoint sizing
    searchButton: {
        flexGrow: theme.spacing(1),
        padding: theme.spacing(1),
        position: 'relative',
        minWidth: '7rem',
        backgroundColor: fade(theme.palette.success.light, 0.75),
        '&:hover': {
            backgroundColor: fade(theme.palette.success.main, 0.75),
        },
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
    // Class used to align modal text
    modalText: {
        textAlign: 'center',
    }
}))

// QueryAlert component returns modal and 
// contains open/close state received from props

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
    // API provider is received via useContext
    // and imported as deconstructed object.
    const { getSearchResults } = useContext(SearchContext)
    
    // queryEvent state used for search string is declared
    // as an empty string
    const [ queryEvent, setQueryEvent ] = useState("");
    // outgoing state used with useEffect is declared
    // the initital value of false
    const [ outgoing, setOutgoing ] = useState(false)

    // SearchRouter component is stored with useRef.
    const searchRouter = useRef();

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    // API Call
    useEffect(() => {
        // outgoing state prevents useEffect from accessing
        // the API on initial page load.
        console.log(location.pathname);
        const locationQuery = location.pathname.split("results?_", 2)
        
        if (outgoing === true) {
            getSearchResults(queryEvent)
            .then(() => {   
                // SearchRouter stores current path object
                // via useRef 
                searchRouter.current = {
                pathname: `/search/results?_${queryEvent}`,                
            }})            
            .then(() => {
                // searchRouter path is pusheded as URL
                // as search results are rendered
                history.push(searchRouter.current)})
            // Function then returns outgoing state back
            // to false via setOutgoing
            .then(setOutgoing(false))
        } else if (location.pathname.includes("results?_") && locationQuery[1] !== queryEvent){
            getSearchResults(encodeURIComponent(locationQuery[1]))        
        } 
    }, [outgoing])
    
    // On input change, the input value is passed to the encodeURIcomponent method
    // and recives URL encoding before it is used in API call.
    const handleSearchChange = (event) => {    
        let formattedQuery = encodeURIComponent(event.target.value);
        setQueryEvent(formattedQuery)
    };

    // const searchValueCheck = (locale) => {
    //     if (locale.includes("results?_")) {
    //         const valueArray = locale.split("results?_")
    //         return decodeURI(valueArray[0]) 
    //     }
    // };

    // Declare  state variable open as false
    const [ modalOpen , setModalOpen] = useState(false);
    
    // Function to update modalOpen boolean to true
    const handleOpenConditional = () => {
        setModalOpen(true)
    };

    // Function to update modalOpen boolean to false
    const handleAlertClose = () => {
        setModalOpen(false);
    }

    // Render searchbar with the handleSearchChange listner on InputBase 
    // and an annoymous function attached to the Button event listner
    // which envokes the model if the queryEvent string is empty.
    // If queryEvent listner is not equal to an event listner,
    // useEffect is envoked by setting outgoing variable in state to true.
    
    return (
        <div className={classes.root}>
            <QueryAlert open={modalOpen} onClose={handleAlertClose} />
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