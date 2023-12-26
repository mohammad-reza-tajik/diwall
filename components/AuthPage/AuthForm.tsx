"use client"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Link from "next/link";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import Grid from "@mui/material/Grid";
import useAuth from "@/hooks/useAuth";
import type {SxProps} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const styles = {
    backgroundImage: {
        position: "fixed",
        display: {xs: "none", md: "block"},
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)) , url('/assets/pictures/banner-desktop-blur.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        filter: "blur(10px)",
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
} satisfies Record<string, SxProps>


function AuthForm ()  {

    const {
        formType,
        formTypeHandler,
        formHandler,
        isLoading,
        usernameOrEmailRef,
        usernameRef,
        emailRef,
        passwordRef
    } = useAuth()


    return (
        <>
            <Grid container item component={"form"}
                  onSubmit={formHandler}
                  sx={styles.form}>

                <ToggleButtonGroup fullWidth size={"large"} color={"primary"} value={formType} exclusive
                                   onChange={formTypeHandler}>
                    <ToggleButton sx={{width: .5, fontSize: "1.6rem"}} value={"login"}>ورود</ToggleButton>
                    <ToggleButton sx={{width: .5, fontSize: "1.6rem"}} value={"signup"}>ثبت نام</ToggleButton>
                </ToggleButtonGroup>

                <Grid my={5} component={Link} href={"/"}>
                    <Image src={"/assets/pictures/logo.png"} alt={"diwall-logo"} width={150} height={150}/>
                </Grid>

                {
                    formType === "signup" ?
                        <>
                            <TextField
                                inputRef={usernameRef} // to use refs on textField components
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={styles.fieldIcon}/>
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
                                            <EmailIcon sx={styles.fieldIcon}/>
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
                                        <PersonIcon sx={styles.fieldIcon}/>
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
                                <PasswordIcon sx={styles.fieldIcon}/>
                            </InputAdornment>
                        ),
                    }}
                    sx={styles.inputField} required type={"password"}
                    placeholder={"رمز ورود"}/>
                <Button type={"submit"} variant={"contained"}
                        disabled={isLoading}
                        startIcon={isLoading ?
                            <CircularProgress color={"inherit"} size={25}/> : formType === "signup" ?
                                <CreateIcon/> :
                                <LoginIcon/>}
                        sx={{
                            width: {xs: .8, sm: .7},
                            height: 55,
                            fontSize: "1.8rem",
                            gap: 10,
                            alignItems: "center"

                        }}>{formType === "signup" ? "ثبت نام" : "ورود"}</Button>


                {
                    formType === "login" ?
                        <Typography sx={{fontSize : 13 ,  mt :20 , color : "primary.main"}}  component={Link} href={"/forgot-password"}>
                            رمز عبور خود را فراموش کرده ام ؟
                        </Typography>
                        : ""

                }
            </Grid>
            <Grid sx={styles.backgroundImage}/>

        </>
    )
}

export default AuthForm