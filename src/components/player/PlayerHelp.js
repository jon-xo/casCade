import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Button, Typography } from "@material-ui/core";
import { RadioButtonUnchecked, Close, Stop, Help, ArrowBack, ArrowDownward, ArrowUpward, ArrowForward, Keyboard, KeyboardTab } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import "../Cascade.css"

// Declare variable to import material-ui components and specify local theme overrides 

const useStyles = makeStyles((theme) => ({
    // Universal Spacing for Player view
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    //  Player header spacing
    helpHeader: {
        fontWeight: "bold",
        textAlign: "center"
    },
    helpTextRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    helpIconSpan: {
        display: 'flex',
        color: '#f5f5f5',
        minWidth: '6rem',
        maxWidth: '7rem',
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2),
        borderRadius: theme.spacing(1),
        alignContent: 'center',
        justifyContent: 'center'
    },
    helpIconSpanText: {
        display: 'inline-flex',
        paddingBottom: theme.spacing(.5),
        paddingLeft: theme.spacing(1)
    },
    // Primary game container div
    // Gradiant color set by Cascade.css
    gameContainer: {
        color: '#f5f5f5',
        minHeight: '45rem',
        height: '60%',
        minWidth: '52rem',
        width: '95%',
        marginTop: theme.spacing(10),
        zIndex: 1,
    },
    helpIcon: {
        fontSize: '2.2rem'
    },
    letterBorder: {
        borderRadius: '50%',
        border: `.2rem solid`,
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    xboxBlue: {
        borderColor: theme.palette.primary.light,
    },
    xboxRed: {
        borderColor: theme.palette.error.light,
    },
    xboxGreen: {
        borderColor: theme.palette.success.light
    },
    controllerText: {
        marginLeft: theme.spacing(.8)
    },
    controllerTextDivider: {
        marginLeft: theme.spacing(.8),
        marginRight: theme.spacing(.8)
    }
}))

export const HelpDialog = () => {
    const [ open, setOpen ] = useState(false);
    const classes = useStyles();
    
    const handleHelpOpen = () => {
        setOpen(true);
    };

    const handleHelpClose = () => {
        setOpen(false);
    };

    const descriptionRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionRef;
            if (descriptionElement !== null)
            {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <div>
                <IconButton color="primary" onClick={handleHelpOpen}>
                    <Help className={classes.helpIcon} />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleHelpClose}
                    scroll={"paper"}
                >
                    <DialogTitle className={classes.helpHeader} id="player-help-title">Game Player Help</DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText
                            id="player-help-text"
                            ref={descriptionRef}
                            tabIndex={-1}
                        >
                            <Typography variant="h6" align="center" component="h3">Keyboard Controls</Typography>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <ArrowBack /><ArrowForward /><ArrowUpward /><ArrowForward />
                                </div>
                                <Typography>Arrow keys used for movement</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Keyboard /> <div className={classes.helpIconSpanText}>Control</div>
                                </div>
                                <Typography>Button 1</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Keyboard /> <div className={classes.helpIconSpanText}>Alt</div>
                                </div>
                                <Typography>Button 2</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Keyboard /> <div className={classes.helpIconSpanText}>Space</div>
                                </div>
                                <Typography>Button 3</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Keyboard /> <div className={classes.helpIconSpanText}>1</div>
                                </div>
                                <Typography>Start</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Keyboard /> <div className={classes.helpIconSpanText}>5</div>
                                </div>
                                <Typography>Coin/Credit</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <KeyboardTab /> <div className={classes.helpIconSpanText}>Tab</div>
                                </div>
                                <Typography>Emulator Menu</Typography>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent dividers={true}>
                    <DialogContentText
                            id="player-help-text"
                            ref={descriptionRef}
                            tabIndex={-1}
                        >
                            <Typography variant="h6" align="center" component="h3">Gamepad Controls</Typography>
                            <Typography variant="subtitle1" align="center" component="h4">Xbox | Playstation</Typography>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <ArrowBack /><ArrowForward /><ArrowUpward /><ArrowForward />
                                </div>
                                <Typography>Left Analog / D-Pad used for movement</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Box className={clsx(classes.letterBorder, classes.xboxGreen)}><Typography className={classes.controllerText}>A</Typography></Box><Typography className={classes.controllerTextDivider} variant="h5" align="center" component="body">|</Typography> <Box className={classes.letterBorder}><Close /></Box>
                                </div>
                                <Typography>Button 1</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Box className={clsx(classes.letterBorder, classes.xboxRed)}><Typography className={classes.controllerText}>B</Typography></Box><Typography className={classes.controllerTextDivider} variant="h5" align="center" component="body">|</Typography> <Box className={classes.letterBorder}><RadioButtonUnchecked /></Box>
                                </div>
                                <Typography>Button 2</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Box className={clsx(classes.letterBorder, classes.xboxBlue)}><Typography className={classes.controllerText}>X</Typography></Box><Typography className={classes.controllerTextDivider} variant="h5" align="center" component="body">|</Typography> <Box className={classes.letterBorder}><Stop /></Box>
                                </div>
                                <Typography>Button 3</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Keyboard /> <div className={classes.helpIconSpanText}>1</div>
                                </div>
                                <Typography>Start</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <Keyboard /> <div className={classes.helpIconSpanText}>5</div>
                                </div>
                                <Typography>Coin/Credit</Typography>
                            </div>
                            <div className={classes.helpTextRow}>
                                <div className={clsx(classes.helpIconSpan, 'gameContainer')}>
                                    <KeyboardTab /> <div className={classes.helpIconSpanText}>Tab</div>
                                </div>
                                <Typography>Emulator Menu</Typography>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleHelpClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
};