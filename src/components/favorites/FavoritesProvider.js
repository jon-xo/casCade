import React, { useState, createContext } from "react"

export const FavoritesContext = createContext();

export const FavortiesProvider = (props) => {
    const [favorites, setFavorites] = useState([]);
    const [favoriteStatus, setFavoriteStatus] = useState(false);

    const activeUserId = localStorage.getItem("cascade_user")

    const getFavorites = () => {
        return fetch(`http://localhost:8088/favorites?userId=${activeUserId}`)
        .then(r => r.json())
        .then(setFavorites)
    };

    const addFavorite = (newFavorite) => {
        return fetch("http://localhost:8088/favorites", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavorite)
        })
        .then(getFavorites)
    };

    const updateFavorite = (favorite) => {
        return fetch(`http://localhost:8088/favorites/${favorite.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favorite)
        })
        .then(getFavorites)
    };

    const deleteFavorite = (favoriteId) => {
        return fetch(`http://localhost:8088/favorites/${favoriteId}`, {
            method: "DELETE"
        })
        .then(getFavorites)
    };

    return (
        <FavoritesContext.Provider value={{
            favorites, setFavorites, getFavorites, addFavorite, updateFavorite, deleteFavorite, favoriteStatus, setFavoriteStatus
        }}>
            {props.children}
        </FavoritesContext.Provider>
    )
};