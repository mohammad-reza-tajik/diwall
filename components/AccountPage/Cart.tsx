import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CartItem from "./CartItem";

import type {ProductType} from "../../db/productModel";

const styles = {
    tab: {
        fontSize: {xs: 12, md: 15},
        color: "#333",
        fontFamily: "dana-bold",

    },
    list: {
        width: 1,
        height: "auto",


    }
}

interface Props {
    isLoading:boolean;
    populatedCart:ProductType[];
    user:any;

}

const Cart : React.FC<Props> = (props) => {
    const {isLoading , populatedCart , user} = props;
    // console.log(populatedCart);
  return (
          <Grid container item xs={12} py={20} px={{xs: 0, md: 10}} spacing={10} direction={"column"}>
              {isLoading ?
                  <Grid container item xs justifyContent={"center"} alignItems={"center"}>
                      <CircularProgress color={"primary"} size={45}/>
                  </Grid> :
                  <Grid container item sx={styles.list} gap={10}>
                      {
                          user?.username === null || populatedCart.length === 0 ?
                              <Grid container item xs minHeight={300} justifyContent={"center"}
                                    alignItems={"center"}>
                                  <Typography fontSize={16} variant={"body1"} component={"p"}
                                              color={"#333"} fontFamily={"dana-bold"}>
                                      سبد خرید شما خالی است !
                                  </Typography>
                              </Grid> :
                              populatedCart.length !== 0 && populatedCart.map((item) =>

                                      <CartItem {...item} key={item._id} />

                              )
                      }

                  </Grid>
              }
          </Grid>

  )
}

export default Cart