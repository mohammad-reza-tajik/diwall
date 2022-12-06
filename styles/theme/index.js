import {createTheme} from "@mui/material";

const theme = createTheme({


    spacing: 1,
    direction: "rtl",
    common: {
        white: "#eee",
        black: "#1d1d1e"

    },

    palette: {
        mode: "light",

        primary: {
            light:"#01faa2",
            main: "#069f69",
            // main: "#000",
        },
        secondary: {
            main: "#f1c800"
        },
        white: {
            main: "#fff"
        },
        text: {
            secondary: "#000",
            primary: "#1d1d1e"
        },
    },

    typography: {
        fontFamily: "inherit",





    }
    ,
    components: {
        MuiButton: {

            defaultProps: {
                disableElevation: true
            }
        },
        MuiSwitch: {
            defaultProps: {
                disableRipple: true
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: "1.6rem",
                },

            }

        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        },
        MuiTypography:{
            styleOverrides:{
                root:{
                    color:"#333"
                }
            }
        },
        MuiPagination:{
            styleOverrides:{
                root:{
                    direction:"rtl"
                }
            }

        }
        ,
        MuiPaginationItem:{
            defaultProps:{
                dir:"rtl"
            },
            styleOverrides:{
                root:{
                    fontSize:14,
                    padding:10,
                    color:"#333",
                    direction:"rtl"

                }
            }
        },
        MuiMenu:{
            defaultProps:{
                disableScrollLock:true
            }

        },


    }

})

export default theme