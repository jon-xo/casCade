import React, { useRef, useState } from "react"
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Tabs, Tab } from "@material-ui/core";
import { Home, Favorite, Search, LocalLibrary } from "@material-ui/icons";
import { LogoLarge } from "../Logo";
import clsx from "clsx";
import { LogoutButton } from "./Logout";

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
    },
    uxButton: {
        margin: theme.spacing(1),
    },
    homeNavIcon: {
        color: theme.palette.success.main,
        fontWeight: 400,
    },
    libraryNavIcon: {
        color: theme.palette.info.dark,
        fontWeight: 400,
    },
    favoritesNavIcon: {
        color: theme.palette.error.main,
        fontWeight: 400,
    },
    searchNavIcon: {
        color: theme.palette.warning.main,
        fontWeight: 400,
    }
}))


// Declare array of objects which contains path and icon keys used in NavBar element

const newNavList = [
    {
        path: "/",
        icon: "Home",
        style: "className={classes.homeNavIcon}",
    },
    {
        path: "/library",
        icon: "LocalLibrary",
        style: "libraryNavIcon",
    },
    {
        path: "/favorites",
        icon: "Favorite",
        style: "",

    },
    {
        path: "/search",
        icon: "Search",
        style: "",
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
// and returns the matching material-ui icon component with the correct style. 
// The second paramater passes any props to the component once returned.

const RenderNavIcon = (icon, props) => {
    const classes = useStyles();
    
    switch (icon) {
        case 'Home':
            return(<Home className={classes.homeNavIcon} {...props} />);   
        case 'LocalLibrary':
            return(<LocalLibrary className={classes.libraryNavIcon} {...props} />);
        case 'Favorite':
            return(<Favorite className={classes.favoritesNavIcon} {...props} />);
        case 'Search':
            return(<Search className={classes.searchNavIcon} {...props} />)
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
            alignItems="center"
        >
            <Grid item sm={10} lg={11} xl={11}>
                <Paper elevation={0} className={clsx(classes.root, classes.margin, classes.simplePaper)}>
                    <LogoLarge gutterBottom/>
                </Paper>
            </Grid>
            <Grid item sm={2} lg={1} xl={1}>
                <LogoutButton className={classes.uxButton}/>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item xs={12}>                   
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
                                    for the Home (/) path. The RenderNavIcon recieves 
                                    // the m.icon value and returns the matching material-ui component
                                    // stored in the switch case.

                                */}
                            {newNavList.map((m) => {
                                const labelName = m.path.replace('/', '');
                                const labelIcon = m.icon;
                                if (labelName === "") {
                                    return <Tab key="home" icon={RenderNavIcon(labelIcon)} label="home" />
                                } else {
                                    return <Tab key={labelName} icon={RenderNavIcon(labelIcon)} label={labelName} />
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