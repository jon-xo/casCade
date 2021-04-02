import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { Typography, IconButton, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, List, ListItem, ListItemText, ListItemIcon, Collapse, Tooltip, Accordion, AccordionDetails, AccordionSummary, Paper } from "@material-ui/core";
import { Favorite, SportsEsports, Subject, Note, Label, ExpandLess, ExpandMore } from "@material-ui/icons";
import { truncate, cardTitle, releaseDate, anchorLink } from "../StrManipulation";
import { fade, makeStyles } from "@material-ui/core/styles";
import { FavoritesContext } from "../favorites/FavoritesProvider";
import { HandleAddFavorite } from "../favorites/FavoritesHandler";
import { useSnackbar } from 'notistack';
import clsx from "clsx"


// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        color: theme.palette.secondary.dark,
    },
    heading: {
        fontWeight: 500,
    },
    cardContainer: {
        // Styles for div which holds all rendered game cards
        minWidth: '50vw',
        maxWidth: '95vw',
        margin: theme.spacing(6),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardStyle: {
        // Primary theme for rendered game cards
        width: theme.spacing(40),
        height: 700,
        margin: theme.spacing(2),
        background: 'linear-gradient (-45deg,rgba(0, 0, 0, 0.2),rgba(255, 255, 255, 0.3))',
        backgroundColor: fade(theme.palette.primary.main, 0.25),
        color: theme.palette.secondary.dark,
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            backgroundColor: fade(theme.palette.primary.main, 0.35),
        },
    },
    cardHeaderSpan: {
        // Set default height for card header
        marginTop: theme.spacing(1),
        height: theme.spacing(10),
        textAlign: 'center',
    },
    cardHeader: {
        // Card header font style
        fontWeight: "bold",
    },
    secondaryText: {
        // Secondary text for list items
        color: theme.palette.secondary.dark,
    },
    cardMedia: {
        // Default styles for card images 
        paddingTop: "15.5%",
        height: 160,
        width: '100%',
    },
    detailsContainer: {
        // Container which holds the Details list
        height: theme.spacing(25),
        overflowX: 'hidden',
    },
    cardAccordian: {
        backgroundColor: fade(theme.palette.secondary.dark, 0.15),
        width: '98%',
    },
    accordianInputContainer: {
        padding: theme.spacing(1),
        backgroundColor: '#f5f5f5',
        borderRadius: '.5rem',
    },
    cardAccordianInput: {
        backgroundColor: '#f5f5f5',
    },
    cardAccordianIcon: {
        marginTop: theme.spacing(.1),
        marginRight: theme.spacing(1),
        width: '1.3rem',
        height: '1.3rem',
    },
    cardSuccessIcon: {
        color: theme.palette.success.main,
        marginTop: theme.spacing(.1),
        marginRight: theme.spacing(1),
        width: '1.3rem',
        height: '1.3rem',
    },
    cardButtonContainer: {
        // Container to anchor card buttons to bottom
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        height: theme.spacing(7),
        alignContent: 'flex-end',
        alignItems: 'flex-end',
    },
    cardDivider: {
        margin: `${theme.spacing(3)}px 0`
    },
    margin: {
        margin: theme.spacing(2),
    },
    paperContainer: {        
        display: 'flex',
        width: '100%',
        minHeight: '3rem',
        justifyContent: 'center',
        alignContent: 'flex-start',
    },
    smallPaper: {
        // Small Rectanglar blue-gray div
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        height: theme.spacing(3),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.secondary.light,
        color: '#f5f5f5',
        fontWeight: 500,
    },
    genreContainer: {
        // Container for the genre tag element
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    genreTag: {
        // Genre tag layout
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: theme.spacing(5),
        minWidth: '40%',
        maxWidth: '100%',
        border: `.1rem solid #f5f5f5`,
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '.5rem',
        fontWeight: 300,
        color: '#f5f5f5',
        marginBottom: theme.spacing(1),
    },
    uncategorizedTag: {
        // Uncatagorized tag layout
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: theme.spacing(5),
        width: theme.spacing(20),
        border: `.1rem solid #f5f5f5`,
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '.5rem',
        fontWeight: 300,
        color: '#f5f5f5',
        marginBottom: theme.spacing(1),
    },
    tagText: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        fontSize: 15,
        textAlign: 'left',
    },
    tagIcon: {
        marginLeft: theme.spacing(2),
        fontSize: 20,
        textAlign: 'left',
    },
    nested: {
        // Indentation for nested list items
        paddingLeft: theme.spacing(4),
    },
    favIcon: {
        // Create red theme for material-ui icons
        fontSize: '1.5rem',
        padding: theme.spacing(.5),
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.error.main,
        }
    },
    myFav: {
        // Create red theme for material-ui icons
        fontSize: '1.5rem',
        padding: theme.spacing(.5),
        color: theme.palette.error.main,
    },
    greenButton: {
        // Create green button for material-ui icons
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1.5),
        backgroundColor: theme.palette.success.main,
        color: '#f5f5f5',
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: '#f5f5f5',
        }
    },
    playLink: {
        textDecoration: 'none',
    }
}))

export const SearchCard = ({ game }, { favorite }) => {
    // Unique state is declared for each card
    const [open, setOpen] = useState(false);

    // Boolean stored to detect when a game is added
    // to Favorites table in local server
    const [favHeart, setFavHeart] = useState(true)

    const { addFavorite, getFavorites, favorites } = useContext(FavoritesContext);

    // API call to fetch Favorites, conditional allows...
    // for useEffect to initiate on page load, and
    // prevents API call until favHeart boolean is manipulated on save

    useEffect(() => {
        if (favHeart === true) {
            getFavorites()
                .then(setFavHeart(false));
        }
    }, [])

    // Function is envoked by Details button event listner
    const handleCardDetails = () => {
        setOpen(!open);
    };

   // Initial state read by material-ui accordian
   const [expanded, setExpanded] = useState("");


   // event handler for accordian change

   const handleAccChange = (panel) => (event, isExpanded) => {      
       // console.log(panel, event, isExpanded);
       if(expanded === panel) {
           setExpanded("")
       } else if (expanded !== panel) {
           setExpanded(isExpanded ? panel : false);
       }
   }      

    // Store deconstructed snackbar react hooks
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Function to display Snackbar on successful add to favorites,
    // must be envoked as a callback function.
    const handleSnacks = (variant, { title }) => () => {
        const snackTitle = cardTitle(title);
        enqueueSnackbar(`${snackTitle} was added to your favorites!`, { variant });
    }
    
    const findNote = favorites.find(f => f.title === game.title)

    // const findNote = () => {
    //     const foundNote = favorites.find(f => f.title === game.title)
    //     console.log(foundNote);        
    //     const newNote = {...foundNote}
    //     return newNote
    // };

    const classes = useStyles();

    // Rendered Card
    return <>

        <Card className={classes.cardStyle} key={game.identifier}>
            <CardMedia
                className={classes.cardMedia}
                image={`https://archive.org/services/img/${game.identifier}`}
                // cardTitle function truncates game titles over 41 characters 
                // and replaces remaining characters with an ellipsis
                title={cardTitle(game.title, 44)}
            />
            <CardActionArea disableRipple={true}>
                <CardContent>
                    <div className={classes.cardHeaderSpan}>
                        {cardTitle(game.title).length > 37 ? 
                        <Tooltip title={cardTitle(game.title)}>
                            <Typography className={classes.cardHeader} variant="h5" component="h2" gutterBottom>
                                {/* cardTitle function truncates game titles over 41 characters
                                        and replaces remaining characters with an ellipsis */}
                                {cardTitle(game.title, 37)}
                            </Typography>
                        </Tooltip>
                        :
                        <Typography className={classes.cardHeader} variant="h5" component="h2" gutterBottom>
                            {/* cardTitle function truncates game titles over 41 characters
                                    and replaces remaining characters with an ellipsis */}
                            {cardTitle(game.title, 37)}
                        </Typography>
                        }
                    </div>
                    <div className={classes.genreContainer}>
                        {/* Turnary checks if game.genre is null and displays the Uncategorized tag if true,
                                else it displays the genre provided by the API truncated to 22 characters */}
                        {!game.genre ? <div className={classes.uncategorizedTag}>
                            <Label className={classes.tagIcon} /><Typography className={classes.tagText} variant="body1" component="p">Uncategorized</Typography>
                        </div> : <div className={classes.genreTag}>
                            <Label className={classes.tagIcon} /><Typography className={classes.tagText} variant="body1" component="p">{truncate(game.genre, 22)}</Typography>
                        </div>}
                    </div>
                    <Divider className={classes.cardDivider} />
                    <div className={classes.detailsContainer}>
                        {favorites.some(f => f.title === game.title) ?
                            <> 
                            <Accordion expanded={expanded === 'panel1'} onChange={handleAccChange('panel1')} className={classes.cardAccordian}>
                            <AccordionSummary
                              expandIcon={<ExpandMore />}                                      
                              id="panel1bh-header"
                            >
                                <Subject className={classes.cardAccordianIcon} />
                                <Typography className={classes.heading}>Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List component="div" disablePadding>
                                    {/* Game Year List Item includes a turnary to display a string if game.data is undefined,
                                    else passes the game.date value to the releaseDate function to shorten string.  */}
                                    <ListItem key={`${game.gameId}--year-header`} className={classes.nested}>
                                        { !game.releaseDate ?  <ListItemText primary="Release Year" secondary="N/A" />:<ListItemText primary="Release Year" secondary={releaseDate(game.releaseDate)} />}
                                    </ListItem>
                                    <ListItem key={`${game.gameId}--publisher-header`} className={clsx(classes.nested, {secondary: classes.secondaryText})}>
                                        <ListItemText primary="Publisher" secondary={game.publisher} />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleAccChange('panel2')} className={classes.cardAccordian}>
                            <AccordionSummary
                              expandIcon={<ExpandMore />}                                      
                              id="panel2bh-header"
                            >
                                {findNote.notes !== "" ? 
                                    <Note className={classes.cardSuccessIcon} />
                                    :
                                    <Note className={classes.cardAccordianIcon} />
                                }                                
                                <Typography className={classes.heading}>Notes</Typography>                                                                                                                            
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.paperContainer}>
                                    { 
                                        findNote.notes === "" ?
                                            <Paper variant={'outlined'} elevation={4} className={classes.smallPaper}>
                                                No notes
                                            </Paper>
                                            :
                                            <Typography variant="body1" component="p">
                                            {findNote.notes}
                                            </Typography>
                                    }
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        </>
                        :
                        <List component="nav" disablePadding >
                            <ListItem button onClick={handleCardDetails} >
                                {/* ListItem component is rendered as button */}
                                <ListItemIcon>
                                    <Subject className={classes.root} />
                                </ListItemIcon>
                                <ListItemText primary="Details" />
                                {/* Turnary checks for inital value of open and diplays the ExpandMore button, else displays ExpandLess */}
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit >
                                <List component="div" disablePadding>
                                    {/* Game Year List Item includes a turnary to display a string if game.data is undefined,
                                            else passes the game.date value to the releaseDate function to shorten string.  */}
                                    <ListItem key={`${game.identifier}--year-header`} className={classes.nested}>
                                        {!game.date ? <ListItemText primary="Release Year" secondary="N/A" /> : <ListItemText primary="Release Year" secondary={releaseDate(game.date)} />}
                                    </ListItem>
                                    <ListItem key={`${game.identifier}--publisher-header`} className={clsx(classes.nested, { secondary: classes.secondaryText })}>
                                        <ListItemText primary="Publisher" secondary={game.creator} />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>                                                                
                        }
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/* Container holds the Favorite and Play buttons,
                        aligned and anchored to the bottom of the card */}
                <div className={classes.cardButtonContainer}>
                    {/* Favorite button includes ternary operator to match the current card's
                                game title to the favorites database, and displays a filled,
                                disabled button to visualize favorites.
                             */}
                    {favorites.some(f => f.title === game.title) ?                        
                        <HashLink className={classes.playLink} smooth to={anchorLink(game.identifier)}>
                            <Tooltip title="Open favorites" placement="top" arrow>
                                <IconButton>
                                    <Favorite className={classes.myFav} />
                                </IconButton>
                            </Tooltip>
                        </HashLink>
                        :
                        <Tooltip title="Add to favorites" placement="top" arrow>
                            <IconButton onClick={() => {
                                HandleAddFavorite(game, addFavorite, handleSnacks);
                                setFavHeart(true);
                            }}>
                                <Favorite className={classes.favIcon} />
                            </IconButton>
                        </Tooltip>
                    }
                    {/* react-router-dom Link is passed the routerLink object via state,
                             which combines API game data for each individual card    */}
                    <Tooltip title="Open game player" placement="top" arrow>
                        <Link className={classes.playLink} to={() => {
                            const gameTitle = cardTitle(game.title);
                            const routerLink = {
                                pathname: `/search/player/${game.identifier}`,
                                state: {
                                    gameId: game.identifier,
                                    title: gameTitle,
                                    releaseDate: game.date,
                                    genre: game.genre,
                                    imgPath: `https://archive.org/services/img/${game.identifier}`,
                                },

                            }
                            return routerLink
                        }}>
                            <Button
                                variant="contained"
                                className={classes.greenButton}
                                startIcon={<SportsEsports />}
                            >
                                Play
                            </Button>
                        </Link>
                    </Tooltip>
                </div>
            </CardActions>
        </Card>

    </>
};