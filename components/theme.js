import {createTheme} from "@mui/material";

const theme = createTheme({


    spacing: 1,
    direction:"rtl",

    common: {
        white: "#eee",
        black: "#1d1d1e"

    },

    palette: {
        mode: "light",

        primary: {
            main: "#11AE77",
        },
        secondary: {
            main: "#f1c800"
        },
        text:{
            secondary:"#000",
            primary:"#000"
        }


    },

    typography: {
        fontFamily: "inherit",


},
components:{
    MuiButton:{
        defaultProps:{
            disableElevation:true
        }
    },
    MuiSwitch:{
        defaultProps:{
            disableRipple:true
        }
    },
    MuiInputBase:{
        styleOverrides:{
            root:{
                fontSize:"1.6rem",
                "&::placeholder":{
                    color:"blue"
                }

            },

        }

    },

}

})

export default theme