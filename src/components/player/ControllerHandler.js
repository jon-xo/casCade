import React, { useState, useEffect } from "react";
import { truncateSimple } from "../StrManipulation";
import { useSnackbar } from 'notistack';

export const ControllerListner = () => {
        // const [ controllerConnect, setControllerConnect ] = useState(false);

        // Store deconstructed snackbar react hooks
        const { enqueueSnackbar } = useSnackbar();      
        // Function to display Snackbar on successful add to favorites,

        useEffect(() => {
                window.addEventListener('gamepadconnected', (e) => {
                //     console.log(e);
                    const gamepadObject = e.gamepad
                    const gamepadState = e.type
                    const gamepadTitle = truncateSimple(gamepadObject.id, 32);

                //     console.log(gamepadTitle);

                    if(gamepadState === "gamepaddisconnected") {
                        enqueueSnackbar(`${gamepadTitle} disconnected`, { variant: "info" });
                    }
                    
                    if (gamepadState === "gamepadconnected"){
                        enqueueSnackbar(`${gamepadTitle} connected`, { variant: "info" });
                    }

                        // setControllerConnect(true)                                       
                })
        }, [])
};