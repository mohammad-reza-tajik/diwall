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
            main: "#069f69",
            // main: "#000",
        },
        secondary: {
            main: "#f1c800"
        },
        white: {
            main: "#eee"
        },
        text: {
            secondary: "#000",
            primary: "#000"
        }


    },

    typography: {
        fontFamily: "inherit",


    },
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
                    "&::placeholder": {
                        color: "blue"
                    }

                },

            }

        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        }

    }

})

export default theme