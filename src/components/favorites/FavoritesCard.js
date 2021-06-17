import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, IconButton, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, List, ListItem, ListItemText, Tooltip, Accordion, AccordionDetails, AccordionSummary, TextField, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide  } from "@material-ui/core";
import { SportsEsports, Subject, Note, Label, ExpandMore, DeleteForever, Edit, Save} from "@material-ui/icons";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from 'notistack';
import { truncate , cardTitle, releaseDate } from "../StrManipulation";
import { HandleDeleteFavorite, HandleUpdateFavorite } from "./FavoritesHandler";
import { FavoritesContext } from "./FavoritesProvider";
import clsx from "clsx"

// Declare variable to import material-ui components and specify local theme overrides 
const useStyles = makeStyles((theme) => ({
    root: {
        "&.MuiFab-base": {
            width: '2.5rem',
            height: '2.5rem',
        },
    },
    base: {
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
        backgroundColor: fade(theme.palette.error.main, 0.55),
        color: theme.palette.secondary.dark,
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            backgroundColor: fade(theme.palette.error.light, 0.65),
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
        color: theme.palette.secondary.dark,
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
    successIconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'start',
        backgroundColor: '#f5f5f5',
        marginLeft: theme.spacing(-.5),
        marginRight: theme.spacing(.9),
        padding: theme.spacing(.22),
        borderRadius: '15%',
    },
    cardSuccessIcon: {
        color: theme.palette.success.main,    
        width: '1.3rem',
        height: '1.4rem',
        marginTop: theme.spacing(-.2)
    },
    cardButtonContainer: {
        // Container to anchor card buttons to bottom
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
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
        width: theme.spacing(10),
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
    deleteIcon: {
        // Create red theme for material-ui icons
        marginBottom: theme.spacing(1),
        width: theme.spacing(6),
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.error.dark,
        }
    },
    settingIcon: {
        // Create red theme for material-ui icons
        marginBottom: theme.spacing(1),
        width: theme.spacing(6),
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.warning.light,
        }
    },
    settingsInner: {
        width: '1.5rem',
        height: '1.5rem',
    },
    greenButton: {
        // Create green button for material-ui icons
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1.5),
        backgroundColor: theme.palette.success.main,
        color: '#f5f5f5',
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
            color: '#f5f5f5',
        }
    },
    playLink: {
        textDecoration: 'none',
    }
}))

export const FavoriteCard = ({ game }) => {
    const { deleteFavorite, updateFavorite }  = useContext(FavoritesContext);

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
    
    // Unique state declared to open notes edit for individual cards
    const [ editOpen, seteditOpen ] = useState(false);

    // Function is envoked by edit button event listner
    const handleCardDetails = () => {
        seteditOpen(!editOpen);
        if(!editOpen){
            handleAccChange(("panel2"), (undefined, true));
        }
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

    // State Variable and function to update card note text
    const [cardNote , setCardNote ] = useState("");

    // Event handler to update new note to state
    const handleCardNote = (event) => {
        const newNote = event.target.value;

        // Update note to state
        setCardNote(newNote);
    };

    // Delete modal state
    const [ showDeleteModal, setShowDeleteModal ] = useState(false)

    // Delete modal event handler
    const handleDeleteShow = () => {
        if(!showDeleteModal){
            setShowDeleteModal(true);
        }
      };
    
      const handleDeleteDismiss = () => {
          if(showDeleteModal){
              setShowDeleteModal(false);
          }
      };

     // Store deconstructed snackbar react hooks
     const { enqueueSnackbar } = useSnackbar();

     // Function to display Snackbar on successful add to favorites,
     // must be envoked as a callback function.
     const handleSnacks = (variant, { title }) => () => {  
        if(title) {
            const snackTitle = cardTitle(title);
            if(variant === "error") {
                enqueueSnackbar(`${snackTitle} was deleted from your favorites!`, { variant });
            } else if(variant === "info") {
               enqueueSnackbar(`${snackTitle} note updated!`, { variant });
            }
        } else {
            if(variant === "error") {
                enqueueSnackbar(`Game deleted from your favorites!`, { variant });
            } else if(variant === "info") {
               enqueueSnackbar(`Note updated!`, { variant });
            }
        }
     } 
    
    const DeleteModal = () => {
        return (
            <Dialog
            open={showDeleteModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDeleteDismiss}
            key={`${game.gameId}--modal`}
            >
                <DialogTitle id={`${game.gameId}-alert-dialog-slide-title`}>{"Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id={`${game.gameId}-alert-dialog-slide-description`}>
                        {cardTitle(game.title, 37)} will be deleted from your favorites.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDismiss} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        HandleDeleteFavorite(game, deleteFavorite, handleSnacks)
                    }} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog> 
        )
    };
    
    // Declare useStyles function in classes variable 
    const classes = useStyles();     
    
    return  <>
            <DeleteModal />  
            <Card className={classes.cardStyle} key={`${game.gameId}--favCard`} id={`${game.gameId}--card`}>
                    <CardMedia
                    className={classes.cardMedia}
                    image={`${game.imgPath}`}
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
                                </div>:<div className={classes.genreTag}>
                                    <Label className={classes.tagIcon} /><Typography className={classes.tagText} variant="body1" component="p">{truncate(game.genre, 22)}</Typography>
                                </div>}
                            </div>
                            <Divider className={classes.cardDivider} />
                            <div className={classes.detailsContainer}>
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
                                    {game.notes !== null ? 
                                        <div className={classes.successIconContainer}>
                                            <Note className={classes.cardSuccessIcon} />
                                        </div>
                                        :
                                        <Note className={classes.cardAccordianIcon} />
                                    }  
                                        <Typography className={classes.heading}>Notes</Typography>                                                                                                                            
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className={classes.paperContainer}>
                                            { editOpen  ?
                                                <div className={classes.accordianInputContainer}>
                                                    <TextField
                                                        id="outlined-textarea"
                                                        label="Edit"
                                                        multiline
                                                        rows={4}
                                                        defaultValue={game.notes}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleCardNote}
                                                        className={classes.cardAccordianInput}
                                                    />
                                                </div>
                                                :
                                                game.notes === "" ?
                                                    <Paper variant={'outlined'} elevation={4} className={classes.smallPaper}>
                                                        No notes
                                                    </Paper>
                                                    :
                                                    <Typography variant="body1" component="p">
                                                    {game.notes}
                                                    </Typography>
                                            }
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {/* Container holds the Favorite and Play buttons,
                        aligned and anchored to the bottom of the card */}
                        <div className={classes.cardButtonContainer}>                                       
                                <Tooltip title="Delete" placement="top" arrow>
                                    <IconButton className={classes.deleteIcon} onClick={handleDeleteShow}>
                                        <DeleteForever />
                                    </IconButton>
                                </Tooltip>                                
                            { !editOpen  ? 
                                <Tooltip title="Edit" placement="top" arrow>
                                    <IconButton className={classes.settingIcon} onClick={handleCardDetails}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title="Save" placement="top" arrow>
                                    <IconButton className={classes.settingIcon} onClick={() => {
                                        handleCardDetails()
                                        HandleUpdateFavorite(game, cardNote, updateFavorite, handleSnacks)
                                    }}>
                                        <Save />
                                    </IconButton>                            
                                </Tooltip>
                            }
   
                            {/* react-router-dom Link is passed the routerLink object via state,
                             which combines API game data for each individual card    */}
                            <Tooltip title="Open game player" placement="top" arrow>
                                <Link className={classes.playLink} to={() => {
                                    const gameTitle = cardTitle(game.title);
                                    const routerLink = {
                                        pathname: `/favorites/player/${game.gameId}`,
                                        state: {
                                            gameId: game.gameId,
                                            title: gameTitle,
                                            releaseDate: game.date,
                                            genre: game.genre,
                                            imgPath: `https://archive.org/services/img/${game.gameId}`,
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