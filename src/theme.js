import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#6596bc',
            main: '#3f7cac',
            dark: '#2c5678',
            contrastText: '#fff'
        },
        secondary: {
            light: '#868792',
            main: '#686a77',
            dark: '#484a53'
        },
        error: {
            light: '#fa6769',
            main: '#f94144',
            dark: '#ae2d2f',
        },
        warning: {
            light: '#fbba44',
            main: '#faa916',
            dark: '#af760f',
        },
        success: {
            light: '#5fbf33',
            main: '#38b000',
            dark: '#277b00',
        }
    },
    status: {
        danger: '#D00000'
    }
})

export default theme;