import React, { useState, useEffect } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import { FormLabel, FormControlLabel, Radio, RadioGroup, Switch } from "@material-ui/core";
// import { Settings, DeleteForever, Edit, Save } from "@material-ui/icons";
// import { FavoritesContext } from "./FavoritesProvider";
// import { makeStyles } from '@material-ui/core/styles';

export const ControllerListner = (SnackHandler) => {
    const [ controllerConnect, setControllerConnect ] = useState(false);

    useEffect(() => {
            window.addEventListener('gamepadconnected', (e) => {
                    console.log(e);
                    SnackHandler("info", e)
                    setControllerConnect(true)                                       
            })

    })
};