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
const Wishlist : React.FC<Props> = (props) => {
    const {isLoading , user ,populatedWishlist } = props;

    return(
        <Grid container item xs={12} py={20} px={{xs: 0, md: 10}} spacing={10}>

            {isLoading ?
                <Grid container item xs minHeight={300} justifyContent={"center"}
                      alignItems={"center"}>
                    <CircularProgress color={"primary"} size={45}/>
                </Grid> :
                user?.username === null || populatedWishlist.length === 0 ?
                    <Grid container item xs minHeight={300} justifyContent={"center"}
                          alignItems={"center"}>
                        <Typography fontSize={16} variant={"body1"} color={"#333"}
                                    fontFamily={"dana-bold"}>
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