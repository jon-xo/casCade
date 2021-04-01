import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { FavoritesContext } from "./FavoritesProvider";
import { truncate , cardTitle, releaseDate } from "../StrManipulation";

export const HandleAddFavorite = (favoriteObject, func, SnackHandler) => {
    
    if(favoriteObject !== undefined) {
        const newFavorite = {
            gameId: favoriteObject.identifier,
            title: favoriteObject.title,
            releaseDate: favoriteObject.date,
            genre: favoriteObject.genre,
            imgPath: `https://archive.org/services/img/${favoriteObject.identifier}`
        }      
        console.log(newFavorite);
        
        func(newFavorite)
        .then(SnackHandler("success", newFavorite))
    } else {
        console.log("favoriteObject = undefined");        
    }
    
};

// export const FavoriteButton = ({props}, object) => {
//     const { addFavorite, setFavoriteStatus } = useContext(FavoritesContext);

//     return (
//     <IconButton onClick={handleAddFavorite(object, addFavorite, setFavoriteStatus)}>
//         <Favorite {...props}/>
//     </IconButton>
//     )
// };