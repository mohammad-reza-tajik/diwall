import {Grid} from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Product from "../../components/Product";

const Products = () => {


    const [allProducts, setAllProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()



    useEffect(()=>{

        axios.get("/api/best-sold-products").then(res => {
            setAllProducts(res.data)
            setIsLoading(false)
            console.log(res.data)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)

        })
    },[])



    return(
        <Grid container item xs={11} direction={"column"}>
            <Grid item xs>
                <SectionHeading text={"تمام محصولات"} />
            </Grid>
            <Grid container item xs spacing={25}>
                {allProducts.map((product)=>

                    <Grid item xs={3} key={product._id}>
                        <Product {...product} />
                    </Grid>

                )}


            </Grid>
        </Grid>
    )
}

export default Products
