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
import Image from "next/image";
import Link from "next/link"
import React, {Fragment, useRef, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {userActions , useAppDispatch} from "../store"


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
        backgroundImage: "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)) , url('assets/pictures/hero-image-desktop.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        filter: "blur(5px)",
    },



}

const SignIn : React.FC = () => {

    //********************************** determine the type of form **********************************//
    const [message, setMessage] = useState<string>("")
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [typeOfForm, setTypeOfForm] = useState<string>("signIn")


    const dispatch = useAppDispatch()

    const openSnackbarHandler = () => {
        setOpenSnackbar(true)

    }

    const closeSnackbarHandler = () => {
        setOpenSnackbar(false)
    }

    const typeOfFormHandler = ( _ , typeOfForm) => {
        // the bottom line is written like this so that only one tab can be active or disabled at a time
        if (typeOfForm !== null)
            setTypeOfForm(typeOfForm);
    }

    //********************************** form field refs **********************************//

    const usernameRef = useRef<HTMLInputElement>()
    const emailRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const usernameOrEmailRef = useRef<HTMLInputElement>()


    const router = useRouter()

    const action = (
        <IconButton
            size="medium"
            sx={{color:"#fff"}}
            onClick={closeSnackbarHandler}>
            <Close fontSize={"large"}/>
        </IconButton>
    )

    const [isLoading, setIsLoading] = useState<boolean>(false)


    //********************************* form submission **********************************!//


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage("")

        const user = typeOfForm === "signup" ? {
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            } :
            {
                usernameOrEmail: usernameOrEmailRef.current?.value,
                password: passwordRef.current?.value

            }

        axios.post(`/api/${typeOfForm === "signup" ? "signup" : "sign-in"}`, user).then(res => {

                setMessage(res.data.message)
                dispatch(userActions.login(res.data.user))

                setIsLoading(false)
                openSnackbarHandler()
                router.back()

            }
        ).catch(e => {
            console.log(e)
            setMessage(e?.response.data.message)
            setIsLoading(false)
            openSnackbarHandler()
        })


    }


    return (
        <Grid container alignItems={"center"} justifyContent={"center"} sx={styles.container}>
            <Head>
                <title>ورود/ثبت نام</title>
            </Head>
            <Box sx={styles.backgroundImage}/>
            <Grid container item component={"form"}
                  onSubmit={formHandler}
                  sx={styles.form}>
                <Grid item container direction={"column"} justifyContent={"center"} alignItems={"center"}>
                    <ToggleButtonGroup fullWidth size={"large"} color={"primary"} value={typeOfForm} exclusive
                                       onChange={typeOfFormHandler}>
                        <ToggleButton sx={{width: .5, fontSize: "1.6rem"}} value={"signIn"}>ورود</ToggleButton>
                        <ToggleButton sx={{width: .5, fontSize: "1.6rem"}} value={"signup"}>ثبت نام</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item my={20}>
                    <Link href={"/"}>
                        <a>
                            <Image src={"/assets/pictures/logo.png"} alt={"logo"} width={100}
                                   height={100}/>
                        </a>
                    </Link>
                </Grid>
                {typeOfForm === "signup" ? <Fragment>
                    <Grid item container justifyContent={"center"}>
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
                    </Grid>
                    <Grid item container justifyContent={"center"}>
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
                    </Grid></Fragment> : <Grid item container justifyContent={"center"}>
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
                </Grid>}
                <Grid item container justifyContent={"center"}>
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
                </Grid>
                <Grid item container justifyContent={"center"}>
                    <Button type={"submit"} variant={"contained"}
                            startIcon={isLoading ?
                                <CircularProgress sx={{color:"#fff"}}  size={25}/> : typeOfForm === "signup" ? <Create/> :
                                    <Login/>}
                            sx={{
                                width: {xs: .8, sm: .7},
                                height: 55,
                                fontSize: "1.8rem",
                                gap: 10,
                                alignItems: "center"

                            }}>{typeOfForm === "signup" ? "ثبت نام" : "ورود"}</Button>
                </Grid>

                {typeOfForm === "signup" ? "" :
                    <Grid item container fontSize={"1.4rem"} mt={15} justifyContent={"center"}>
                        <Link href={"/forgot-password"}>رمز عبور خود را فراموش کرده ام ؟</Link>
                    </Grid>
                }
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={500000}
                sx={{
                    fontFamily: "dana-bold",
                    backgroundColor: "error.main !important",
                }}
                message={message}
                onClose={closeSnackbarHandler}
                action={action}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            />

        </Grid>
    )
}
export default SignIn