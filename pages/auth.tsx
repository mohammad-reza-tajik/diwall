import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Close from "@mui/icons-material/Close";
import Create from "@mui/icons-material/Create";
import Email from "@mui/icons-material/Email";
import Login from "@mui/icons-material/Login";
import Password from "@mui/icons-material/Password";
import Person from "@mui/icons-material/Person";

import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link"
import React from "react";
import useAuth from "../hooks/useAuth";


const styles = {
    container: {
        minWidth: "100vw",
        minHeight: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
    },
    form: {
        bgcolor: "white.main",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: {xs: 1, md: 570},
        height: {xs: "100vh", md: 570},
        zIndex: "mobileStepper"

    },
    inputField: {
        width: {xs: .8, sm: .7},
        mb: 15,


    },
    fieldIcon: {

        fontSize: "2rem",
        color: "primary.main"
    },
    backgroundImage: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)) , url('/assets/pictures/banner-desktop-blur.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        filter: "blur(10px)",
    },


}

const Auth: React.FC = () => {

    const {
        closeSnackbarHandler,
        typeOfForm,
        openSnackbar,
        typeOfFormHandler,
        formHandler,
        isLoading,
        message,
        usernameOrEmailRef,
        usernameRef,
        emailRef,
        passwordRef
    } = useAuth()


    const action = (
        <IconButton
            size="medium"
            sx={{color: "#fff"}}
            onClick={closeSnackbarHandler}>
            <Close fontSize={"large"}/>
        </IconButton>
    )


    return (
        <Grid container alignItems={"center"} justifyContent={"center"} sx={styles.container}>
            <Head>
                <title>
                    دیوال - ورود/ثبت نام
                </title>
            </Head>
            <Box sx={styles.backgroundImage}/>
            <Grid container item component={"form"}
                  onSubmit={formHandler}
                  sx={styles.form}>

                <ToggleButtonGroup fullWidth size={"large"} color={"primary"} value={typeOfForm} exclusive
                                   onChange={typeOfFormHandler}>
                    <ToggleButton sx={{width: .5, fontSize: "1.6rem"}} value={"signIn"}>ورود</ToggleButton>
                    <ToggleButton sx={{width: .5, fontSize: "1.6rem"}} value={"signup"}>ثبت نام</ToggleButton>
                </ToggleButtonGroup>

                <Box my={5} component={Link} href={"/"}>
                    <Image src={"/assets/pictures/logo.png"} alt={"dival-logo"} width={150} height={150}/>
                </Box>

                {
                    typeOfForm === "signup" ?
                        <>
                            <TextField
                                inputRef={usernameRef} // to use refs on textField components
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person sx={styles.fieldIcon}/>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={styles.inputField} id={"username-field"} required type={"text"}
                                placeholder={"نام کاربری"}/>
                            <TextField
                                inputRef={emailRef}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={styles.fieldIcon}/>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={styles.inputField} id={"email-field"} required type={"email"}
                                placeholder={"ایمیل"}/>
                        </> :
                        <TextField
                            inputRef={usernameOrEmailRef}

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={styles.fieldIcon}/>
                                    </InputAdornment>
                                ),
                            }}
                            sx={styles.inputField} id={"username-or-email"} required type={"text"}
                            placeholder={"ایمیل یا نام کاربری"}/>
                }
                <TextField
                    inputRef={passwordRef}

                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Password sx={styles.fieldIcon}/>
                            </InputAdornment>
                        ),
                    }}
                    sx={styles.inputField} required type={"password"}
                    placeholder={"رمز ورود"}/>
                <Button type={"submit"} variant={"contained"}
                        startIcon={isLoading ?
                            <CircularProgress sx={{color: "#fff"}} size={25}/> : typeOfForm === "signup" ?
                                <Create/> :
                                <Login/>}
                        sx={{
                            width: {xs: .8, sm: .7},
                            height: 55,
                            fontSize: "1.8rem",
                            gap: 10,
                            alignItems: "center"

                        }}>{typeOfForm === "signup" ? "ثبت نام" : "ورود"}</Button>


                {
                    typeOfForm === "signup" ?
                        "" :
                        <Box fontSize={13} mt={20} component={Link} href={"/forgot-password"}>
                            رمز عبور خود را فراموش کرده ام ؟
                        </Box>

                }
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={500000}
                message={message}
                onClose={closeSnackbarHandler}
                action={action}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
            />

        </Grid>
    )
}
export default Auth