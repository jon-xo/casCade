import React, { useRef, useState } from "react"
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Tabs, Tab } from "@material-ui/core";
import { Home, Favorite, Search, LocalLibrary } from "@material-ui/icons";
import { LogoLarge } from "../Logo";
import clsx from "clsx";

// Declare local variable to declare custom css for material-ui components

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',        
    },
    margin: {
        margin: theme.spacing(1),
    },
    navPaper: {
        textAlign: 'center',
        color: theme.palette.text.primary
    },
    simplePaper: {
        border: 0,
    }
}))


// Declare array of objects which contains path and icon keys used in NavBar element

const newNavList = [
    {
        path: "/",
        icon: "Home",
    },
    {
        path: "/library",
        icon: "LocalLibrary",
    },
    {
        path: "/favorites",
        icon: "Favorite",

    },
    {
        path: "/search",
        icon: "Search"
    }
]

// Function finds and returns the index of the path key stored in the newNavList array.

const matchNavObject = (location) => {
    
    return newNavList.findIndex(n => n.path === location)
};

// ActiveTab component reads the current browser URL path and returns 
// the matching index interger

const ActiveTab = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const modifiedNavArray = useRef();
    const arrayMatch = useRef();

    const updateRootPath = () => {
        const workingNavList = newNavList.slice();
        const rootIndex = workingNavList.findIndex(nm => nm.path === "/")
        const newRoot = {
            path: "/root",
            icon: "Home",
        }

        workingNavList.splice(rootIndex, 1)
        workingNavList.splice(0, 0, newRoot)
        modifiedNavArray.current = workingNavList

    };
    updateRootPath();
    
    const navFilter = (array) => {
        array.forEach(item => {
            if(currentLocation.includes(item.path)) {                
                arrayMatch.current = matchNavObject(item.path)
            }
        });

    };
    
    navFilter(modifiedNavArray.current)
    if (arrayMatch.current === undefined) {
        return 0
    } else {
        return arrayMatch.current
    }
    
};


// Function uses switch case to match the string value of the icon key
// and returns the matching material-ui icon component. The second paramater
// passes any props to the component once returned.

const renderNavIcon = (icon, props) => {
    switch (icon) {
        case 'Home':
            return(<Home {...props} />);   
        case 'LocalLibrary':
            return(<LocalLibrary {...props} />);
        case 'Favorite':
            return(<Favorite {...props} />);
        case 'Search':
            return(<Search {...props} />)
;        default:
            return(<Home {...props} />);
    }
};

// NavBar component sets state variable of value
// to the index returned by ActiveTab, once JSX is rendered
// Tabs element adds the handleNavChange function to an event listner,
// handleNavChage updates state with the newNavValue and
// NavBar reflects the active tag accordingly.

export const NavBar = () => {
    const [ value , setValue ] = useState(ActiveTab());

    const history = useHistory();
    const classes = useStyles();
    
    const handleNavChange = (e, newNavValue) => {
        
        setValue(newNavValue)
        history.push(newNavList[newNavValue].path)

    }

    return (
        <>
        <Grid container
            direction="row"
            justify="flex-start"
            alignItems="center">

        <Grid item lg={12}>
            <Paper elevation={0} className={clsx(classes.root, classes.margin, classes.simplePaper)}>
                <LogoLarge gutterBottom/>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={12} lg={12}>                   
                    <Paper elevation={2} className={clsx(classes.navPaper)}>
                        <Tabs
                        value={value}
                        indicatorColor="primary"
                        onChange={handleNavChange}
                        centered
                        >
                            {/* Map method is called on the NavList array of objects.
                                The forward slash (/) is removed from each objects'
                                path key value, if the labelName variable equals
                                an empty string, a Tab is returned
                                for the Home (/) path. The renderNavIcon recieves 
                                // the m.icon value and returns the matching material-ui component
                                // stored in the switch case.

                            */}
                        {newNavList.map((m) => {
                            const labelName = m.path.replace('/', '');
                            const labelIcon = m.icon
                            if (labelName === "") {
                                return <Tab key="home" icon={renderNavIcon(labelIcon)} label="home" />
                            } else {
                                return <Tab key={labelName} icon={renderNavIcon(labelIcon)} label={labelName} />
                            }
                        })}
                        </Tabs>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
        </>
    )
};