import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CartItem from "./CartItem";
import type {ProductType} from "@/db/productModel";
import type {User} from "@/store/userSlice";


interface Props {
    isLoading:boolean;
    populatedCart:ProductType[];
    user:User;

}

const Cart : React.FC<Props> = ({isLoading , populatedCart , user}) => {
  return (
          <Grid container item xs={12} py={20} pr={{xs: 0, md: 10}} spacing={10} height={1}>
              {isLoading ?
                  <Grid container item xs={12} justifyContent={"center"} alignItems={"center"}>
                      <CircularProgress color={"primary"} size={45}/>
                  </Grid> :
                  <Grid container item gap={10}>
                      {
                          user?.username === null || populatedCart.length === 0 ?
                              <Grid container item xs justifyContent={"center"}
                                    alignItems={"center"}>
                                  <Typography fontSize={16} component={"p"}>
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