import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

export default createMuiTheme({
    typography: {
        fontFamily: [
            'Work Sans', 
            'Helvetica', 
            'Arial', 
            'sans-serif'
        ].join(',')
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: deepPurple[500],
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: deepPurple[500],
        },
      },    
});
