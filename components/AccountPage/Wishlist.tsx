import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Product from "../Globals/Product";
import {UserType} from "@/db/userModel";

function Wishlist(user: UserType) {

    return (
        <Grid container item xs={12} spacing={10} height={1}>
            {
                !user.username || user.wishlist.length === 0 ?
                    <Grid container item xs={12} component={Typography} justifyContent={"center"} fontSize={16}
                          alignItems={"center"}>
                        لیست علاقمندی های شما خالی است!
                    </Grid> :
                    user.wishlist.map(product =>
                        <Grid item xs={6} sm={4} key={product._id}>
                            <Product  {...product} />
                        </Grid>)
            }
        </Grid>
    )

}

export default Wishlist