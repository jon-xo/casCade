import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import { FormLabel, FormControlLabel, Radio, RadioGroup, Switch } from "@material-ui/core";
import { Settings, DeleteForever, Edit, Save } from "@material-ui/icons";
import { FavoritesContext } from "./FavoritesProvider";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    }
  }));

const currentUser = localStorage.getItem('cascade_user')

export const HandleDeleteFavorite = (favoriteObject, func, SnackHandler) => {

    // Import delete favorite function from FavoritesContext
    const favoriteId = favoriteObject.id;
    
    if(favoriteId && favoriteId !== undefined) {
        func(favoriteId)
        .then(SnackHandler("error", favoriteObject))
    }
};

export const HandleUpdateFavorite = (favoriteObject, value, func, SnackHandler) => {

    // Import delete favorite function from FavoritesContext
    const favoriteId = favoriteObject.id;
    
    if(favoriteId && favoriteId !== undefined) {
        func({
            gameId: favoriteObject.gameId,
            title: favoriteObject.title,
            releaseDate: favoriteObject.releaseDate,
            imgPath: favoriteObject.imgPath,
            notes: value,
            user: currentUser,
            id: favoriteId,
        })
        .then(SnackHandler("info", favoriteObject))
    }
};

export const HandleAddFavorite = (favoriteObject, func, SnackHandler) => {
    
    if(favoriteObject !== undefined) {
        const newFavorite = {
            gameId: favoriteObject.identifier,
            title: favoriteObject.title,
            releaseDate: favoriteObject.date,
            genre: favoriteObject.genre,
            publisher: favoriteObject.creator,
            notes: null,
            imgPath: `https://archive.org/services/img/${favoriteObject.identifier}`,
            user: currentUser
        }
        
        func(newFavorite)
        .then(SnackHandler("success", newFavorite))
    } else {
        console.log("favoriteObject = undefined");        
    }
    
};