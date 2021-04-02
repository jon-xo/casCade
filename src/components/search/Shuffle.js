import React, { useContext, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LibraryContext } from "../library/LibraryProvider";
import { cardTitle } from "../StrManipulation";
import { makeStyles } from '@material-ui/core/styles';


const gameRandomizer = (array) => {
    const randomIdentifier = Math.floor(Math.random() * array.length)
    const gameData = array[randomIdentifier]
    return gameData
};


export const RandomGame = (games, route) => {

    
    if (games) {
        const gameResult = gameRandomizer(games);
        const gameTitle = cardTitle(gameResult.title);
        const historyObject = {
            pathname: `/library/player/${gameResult.identifier}`,
            state: {
                gameId: gameResult.identifier,
                title: gameTitle,
                releaseDate: gameResult.date,
                genre: gameResult.genre,
                imgPath: `https://archive.org/services/img/${gameResult.identifier}`,
            },
        }
        route.push(historyObject)
    }

};

