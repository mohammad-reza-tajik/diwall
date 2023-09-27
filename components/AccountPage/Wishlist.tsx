import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Product from "../Globals/Product";
import type {User} from "@/store/userSlice";
import type {ProductType} from "@/db/productModel";


interface Props {
    isLoading:boolean;
    populatedWishlist:ProductType[];
    user:User;
}
const Wishlist : React.FC<Props> = ({isLoading , user ,populatedWishlist }) => {

    return(
        <Grid container item xs={12} py={20} pr={{xs: 0, md: 10}} spacing={10} height={1}>

            {isLoading ?
                <Grid container item xs={12} justifyContent={"center"}
                      alignItems={"center"}>
                    <CircularProgress color={"primary"} size={45}/>
                </Grid> :
                user?.username === null || populatedWishlist.length === 0 ?
                    <Grid container item xs={12} justifyContent={"center"}
                          alignItems={"center"}>
                        <Typography fontSize={16} component={"p"}>
                            لیست علاقمندی های شما خالی است!
                        </Typography>
                    </Grid> :

                    populatedWishlist.map(item =>
                        <Grid item xs={6} sm={4} key={item._id}>
                            <Product  {...item} />
                        </Grid>)}
        </Grid>
    )

}
export default Wishlist