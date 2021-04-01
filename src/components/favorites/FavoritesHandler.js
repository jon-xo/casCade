import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import { FormLabel, FormControlLabel, Radio, RadioGroup, Switch } from "@material-ui/core";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
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

export const HandleAddFavorite = (favoriteObject, func, SnackHandler) => {
    
    if(favoriteObject !== undefined) {
        const newFavorite = {
            gameId: favoriteObject.identifier,
            title: favoriteObject.title,
            releaseDate: favoriteObject.date,
            genre: favoriteObject.genre,
            publisher: favoriteObject.creator,
            imgPath: `https://archive.org/services/img/${favoriteObject.identifier}`,
            user: currentUser
        }      
        console.log(newFavorite);
        
        func(newFavorite)
        .then(SnackHandler("success", newFavorite))
    } else {
        console.log("favoriteObject = undefined");        
    }
    
};

const actions = [
    { 
        icon: <DeleteForever />, 
        name: 'Delete' 
    },
    { 
        icon: <Edit />, 
        name: 'Edit' 
    },
    { 
        icon: <Save />, 
        name: 'Save' 
    },
];

export const SettingsDial = (props) => {

      return (
          <>
            <SpeedDial {...props}>
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipPlacement={'right-end'}
                        onClick={(e) => {
                            console.log(e);                            
                        }}                 
                    />
                ))}
            </SpeedDial>

          
          </>
      )
};