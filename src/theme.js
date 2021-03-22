import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3f7cac',
        },
        secondary: {
            main: '#686a77',
        }
    },
    status: {
        danger: '#D00000'
    }
})

export default theme;