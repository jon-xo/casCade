import React from "react";
// import { FormLabel, FormControlLabel, Radio, RadioGroup, Switch } from "@material-ui/core";
// import { FavoritesContext } from "./FavoritesProvider";

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
        if (value === "") {
            func({
                gameId: favoriteObject.gameId,
                title: favoriteObject.title,
                releaseDate: favoriteObject.releaseDate,
                imgPath: favoriteObject.imgPath,
                notes: null,
                user: currentUser,
                id: favoriteId,
            })
        } else {
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