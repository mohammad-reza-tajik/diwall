import Grid from "@mui/material/Grid";
import CartItem from "./CartItem";
import Typography from "@mui/material/Typography";
import {UserType} from "@/db/userModel";

function Cart(user: UserType) {
    return (
        <Grid container item xs={12} height={1} direction={"column"} gap={10}>
            {
                !user.username || user.cart.length === 0 ?
                    <Grid container item xs={12} component={Typography} justifyContent={"center"} fontSize={16}
                          alignItems={"center"}>
                        سبد خرید شما خالی است !
                    </Grid> :
                    user.cart.map((product) => <CartItem {...product} key={product._id}/>)
            }
        </Grid>
    )
}

export default Cart