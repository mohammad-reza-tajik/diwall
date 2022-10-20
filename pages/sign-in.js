import {
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    Snackbar,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";


import Head from "next/head";
import {Close, Create, Email, Login, Password, Person} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link"
import {Fragment, useContext, useRef, useState} from "react";
// import classes from "../styles/sign-in.modules.css"
// import "../styles/SignIn.css";
import axios from "axios";
import {useRouter} from "next/router";
import AuthContext from "../context/auth-context";
import loadingContext from "../context/loading-context";


const styles = {
    container: {
        minWidth: "100vw",
        minHeight: "100vh",
        // backgroundColor: "#02011e",
        // backgroundImage:"url('assets/pictures/hero_img4.jpg')",
        // backgroundRepeat:"no-repeat",
        // backgroundSize:"100% 100%",
        // filter:"blur(5px)",
        // backgroundColor: "#069f69",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        // my:100
    },
    form: {
        bgcolor: "white.main",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: {xs: 1, md: 570},
        height: {xs: "100vh", md: 570},
        // boxShadow:"2px 2px 5px rgba(0,0,0,.4)",
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
    snackbar: {
        '& .css-1kr9x0n-MuiSnackbarContent-action': {
            mr: 70,
            pl: .1
        },

        '& .css-1exqwzz-MuiSnackbarContent-message': {
            p: 13
        },
    }


}

const SignIn = () => {

    //********************************** determine the type of form **********************************//
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [typeOfForm, setTypeOfForm] = useState("signIn")




    const openSnackbarHandler = () => {
        setOpenSnackbar(true)

    }

    const closeSnackbarHandler = () => {
        setOpenSnackbar(false)
    }
    const typeOfFormHandler = (event, typeOfForm) => {
        // the bottom line is written like this so that only one tab can be active or disabled at a time
        if (typeOfForm !== null)
            setTypeOfForm(typeOfForm);
    }

    //********************************** form fields refs **********************************//

    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameOrEmailRef = useRef()


    const router = useRouter()

    const action = (
        <IconButton
            size="medium"
            color={"white"}
            onClick={closeSnackbarHandler}>
            <Close fontSize={"large"}/>
        </IconButton>
    )

    const authContext = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)


    //********************************* form submission **********************************!//


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage("")
        setError(false)

        const user = typeOfForm === "signup" ? {
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            } :
            {
                usernameOrEmail: usernameOrEmailRef.current?.value,
                password: passwordRef.current?.value

            }

        // console.log(user)


        axios.post(`/api/${typeOfForm === "signup" ? "signup" : "sign-in"}`, user).then(res => {

                setMessage(res.data.message)
                setError(!res.data.ok)
                authContext.login(res.data.user)
                // console.log(res)
                setIsLoading(false)
                openSnackbarHandler()
                router.back()

            }
        ).catch(e => {
            console.log(e)
            setMessage(e.response.data.message)
            setError(!e.response.data.ok)
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
                            // value={usernameValue}
                            // onChange={usernameChangeHandler}
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
                            // value={emailValue}
                            // onChange={emailChangeHandler}
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
                        // value={usernameOrEmailValue}
                        // onChange={usernameOrEmailChangeHandler}
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
                        // value={passwordValue}
                        // onChange={passwordChangeHandler}
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
                                <CircularProgress color={"white"} size={25}/> : typeOfForm === "signup" ? <Create/> :
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
                autoHideDuration={5000}
                sx={{
                    ...styles.snackbar,
                    '& .css-1qe5cpw-MuiPaper-root-MuiSnackbarContent-root': {
                        fontSize: "16px !important",
                        fontFamily: "dana-demibold",
                        // width:"70px",
                        backgroundColor: (error === false ? "success.main" : "error.main"),
                    },
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