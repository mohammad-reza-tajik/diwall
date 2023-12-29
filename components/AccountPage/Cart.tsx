import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import CartItem from "./CartItem";
import type {ProductType} from "@/db/productModel";
import type {User} from "@/store/userSlice";
import Typography from "@mui/material/Typography";

interface Props {
    isLoading:boolean;
    populatedCart:ProductType[];
    user:User;
}

function Cart ({isLoading , populatedCart , user} : Props)  {
  return (
          <>
              {
                  isLoading ?
                  <Grid container item xs={12} justifyContent={"center"} height={1} alignItems={"center"}>
                      <CircularProgress color={"primary"} size={45}/>
                  </Grid> :
                  <Grid container item xs={12} height={1} direction={"column"} gap={10}>
                      {
                          user?.username === null || populatedCart.length === 0 ?
                              <Grid container item xs={12} component={Typography} justifyContent={"center"} fontSize={16}
                                    alignItems={"center"}>
                                      سبد خرید شما خالی است !
                              </Grid> :
                              populatedCart.map((item) => <CartItem {...item} key={item._id} />

                              )
                      }

                  </Grid>
              }
          </>

  )
}

export default Cart