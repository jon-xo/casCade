import { useEffect } from "react";
import { truncateController } from "../StrManipulation";
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
                    const gamepadTitle = truncateController(gamepadObject.id);

                //     console.log(gamepadTitle);
                    
                    if (gamepadState === "gamepadconnected"){
                        enqueueSnackbar(`${gamepadTitle} connected`, { variant: "info" }, { preventDuplicate: true, });
                    }
                                      
                })
        }, [enqueueSnackbar])
};


export const DisconnectListner = () => {
    // const [ controllerConnect, setControllerConnect ] = useState(false);

    // Store deconstructed snackbar react hooks
    const { enqueueSnackbar } = useSnackbar();      
    // Function to display Snackbar on successful add to favorites,


    useEffect(() => {
        window.addEventListener('gamepaddisconnected', (e) => {
            //     console.log(e);
                const gamepadObject = e.gamepad
                const gamepadState = e.type
                const gamepadTitle = truncateController(gamepadObject.id);

            //     console.log(gamepadTitle);

            if(gamepadState === "gamepaddisconnected") {
                enqueueSnackbar(`${gamepadTitle} disconnected`, { variant: "info" }, { preventDuplicate: true, });
            }                
                                  
            })
        
    }, [enqueueSnackbar])
};