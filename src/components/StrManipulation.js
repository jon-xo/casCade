import React from "react";

export const truncate = (str, n) => {
    return (str.length > n) ? <span>{(str.substr(0, n-1 ))}&hellip;</span> : str;
};

export const cardTitle = (title, length) => {
    let editedTitle = title.replace(/ *\([^)]*\) */g, '').replace('Internet Arcade:', '')
    return truncate(editedTitle, length)
};

export const releaseDate = (date) => {
    const editedDate = date.replace('-01-01T00:00:00Z', '')
    if (editedDate.includes('19')) {
        return parseInt(editedDate)
    } else {
        return editedDate
    }
};