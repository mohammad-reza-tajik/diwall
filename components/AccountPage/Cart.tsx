import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CartItem from "./CartItem";
import Divider from "@mui/material/Divider";

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
    populatedCart:any;
    user:any;

}

const Cart : React.FC<Props> = (props) => {
    const {isLoading , populatedCart , user} = props;
  return (
          <Grid container item xs={12} py={20} px={{xs: 0, md: 10}} spacing={10}>
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

                                  <Grid container item xs={12}
                                        key={item._id}>

                                      <CartItem {...item} />
                                      <Divider sx={{width: 1}}/>

                                  </Grid>
                              )
                      }

                  </Grid>
              }
          </Grid>

  )
}

export default Cart