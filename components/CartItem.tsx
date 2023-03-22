import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles"
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Delete from "@mui/icons-material/Delete";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import React, {useCallback, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector, userActions} from "../store";
import Image from "next/image";

interface Props {
    _id: string;
    title: string;
    image: string;

}

const CartItem: React.FC<Props> = (props) => {

    const router = useRouter()

    const user = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [numberInCart, setNumberInCart] = useState(1)
    const numbersInCartChangeHandler = useCallback((e) => {
        setNumberInCart(e.target.value)

    },[])

    const removeFromCart = () => {
        if (user?.username) {

            axios.put("/api/remove-from-cart", {
                userId: user?.userId, token: user?.token, productId: props._id
            }).then(_ => {
                dispatch(userActions.removeFromCart(props._id))

            })
        }

    }

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

    return (
            <Grid container item xs={12}>
                <Grid className={"pointer"} container item xs={12} md={true} lg={6} alignItems={"center"}
                      gap={matchesMD ? 10 : 20} onClick={() => router.push("/products/" + props._id.toString())}>
                    <Grid item xs={"auto"}>
                        <Image src={`/assets/pictures/products/${props.title?.replaceAll(" ", "-")}.jpg`} width={50} height={50}
                                alt={props.title}/>
                    </Grid>
                    <Grid item xs>
                        <Typography variant={"h4"} fontSize={{xs: 14, lg: 16}} color={"#666"}>
                            {props.title}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={"auto"} lg={6} alignItems={"center"} gap={-20}
                      justifyContent={"flex-end"}>

                    <IconButton onClick={() => {
                        setNumberInCart((prevState) => +prevState + 1)
                    }}>
                        <AddCircleOutline color={"primary"} sx={{fontSize: {xs: 30, md: 30}}}/>
                    </IconButton>
                    <TextField onChange={numbersInCartChangeHandler} value={numberInCart} sx={{width: {xs: 40, md: 80}}}
                               color={"primary"} type={"number"} size={"small"} variant={"standard"}/>

                    {numberInCart != 1 ?
                        <IconButton onClick={() => {
                            setNumberInCart((prevState) => +prevState - 1)
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