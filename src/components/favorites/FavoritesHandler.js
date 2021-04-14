import React from "react";
// import { FormLabel, FormControlLabel, Radio, RadioGroup, Switch } from "@material-ui/core";
// import { FavoritesContext } from "./FavoritesProvider";

export const HandleDeleteFavorite = (favoriteObject, func, SnackHandler) => {

    // Import delete favorite function from FavoritesContext
    const favoriteId = favoriteObject.id;
    
    if(favoriteId && favoriteId !== undefined) {
        func(favoriteId)
        .then(SnackHandler("error", favoriteObject))
    }
};

export const HandleUpdateFavorite = (favoriteObject, value, func, SnackHandler) => {

    const currentUser = +localStorage.getItem('cascade_user');
    
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
                userId: currentUser,
                id: favoriteId,
            })
        } else {
            func({
                gameId: favoriteObject.gameId,
                title: favoriteObject.title,
                releaseDate: favoriteObject.releaseDate,
                imgPath: favoriteObject.imgPath,
                notes: value,
                userId: currentUser,
                id: favoriteId,
            })
            .then(SnackHandler("info", favoriteObject))
        }
    }
};

export const HandleAddFavorite = (favoriteObject, func, SnackHandler) => { 

    const currentUser = +localStorage.getItem('cascade_user');
    
    if(favoriteObject !== undefined) {
        const newFavorite = {
            gameId: favoriteObject.identifier,
            title: favoriteObject.title,
            releaseDate: favoriteObject.date,
            genre: favoriteObject.genre,
            publisher: favoriteObject.creator,
            notes: null,
            imgPath: `https://archive.org/services/img/${favoriteObject.identifier}`,
            userId: currentUser
        }
        console.log(currentUser);        
        console.log(newFavorite);        
        func(newFavorite)
        .then(SnackHandler("success", newFavorite))
    } else {
        console.log("favoriteObject = undefined");
    }
    
};