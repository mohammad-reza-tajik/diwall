import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles"
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Delete from "@mui/icons-material/Delete";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import React, {ChangeEvent, useState} from "react";
import {useRouter} from "next/router";
import {snackbarActions, useAppDispatch, useAppSelector, userActions} from "@/store";
import Image from "next/image";

import type {ProductType} from "@/db/productModel";
import useFetch from "@/hooks/useFetch";


const CartItem: React.FC<ProductType> = (props) => {

    const router = useRouter()

    const user = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const [numberInCart, setNumberInCart] = useState(1)
    const numbersInCartChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        setNumberInCart(Number(event.target .value))

    }

    const removeFromCart = async () => {
        if (user?.username) {

            await useFetch.put("/api/remove-from-cart", {
                _id: user?._id,
                token: user?.token, productId: props._id
            })
            dispatch(userActions.removeFromCart(props._id));
            dispatch(snackbarActions.openSnackbar({message : "از سبد خرید شما حذف شد" , status : "info"}))



        }

    }


    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

    const title = props.title.split(" ").join("_")

    return (
            <Grid container item xs={12}>
                <Grid className={"pointer"} container item xs={12} md={true} lg={6} alignItems={"center"}
                      gap={matchesMD ? 10 : 20} onClick={() => router.push("/products/" + title)}>
                    <Grid item xs={"auto"}>
                        <Image src={`/assets/pictures/products/${props.slug}.jpg`} width={50} height={50}
                                alt={props.title}/>
                    </Grid>
                    <Grid item xs>
                        <Typography variant={"h4"} fontSize={{xs: 14, lg: 16}} color={"#666"}>
                            {props.title}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={"auto"} lg={6} alignItems={"center"}
                      justifyContent={"flex-end"}>

                    <IconButton onClick={() => {
                        setNumberInCart((prevState) => Number(prevState) + 1)
                    }}>
                        <AddCircleOutline color={"primary"} sx={{fontSize: {xs: 30, md: 30}}}/>
                    </IconButton>
                    <TextField onChange={numbersInCartChangeHandler} value={numberInCart} sx={{width: {xs: 40, md: 80}}}
                               color={"primary"} type={"number"} size={"small"} variant={"standard"}/>

                    {
                        numberInCart != 1 ?
                        <IconButton onClick={() => {
                            setNumberInCart((prevState) => Number(prevState) - 1)
                        }}>
                            <RemoveCircleOutline color={"primary"} sx={{fontSize: {xs: 30, md: 30}}}/>
                        </IconButton> :

                        <IconButton onClick={removeFromCart}>
                            <Delete color={"primary"} sx={{fontSize: {xs: 30, md: 30}}}/>
                        </IconButton>

                    }

                </Grid>
            </Grid>

    )

}

export default CartItem