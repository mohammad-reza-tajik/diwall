import {CircularProgress, Grid, Typography} from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";

const Products = () => {


    const [products, setProducts] = useState([])
    const [page,setPage] = useState(1)
    const [pageInformation, setPageInformation] = useState(1)
    // const [title , setTitle] = useState("همه محصولات")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()



    useEffect(()=>{
        setIsLoading(true)
        axios.post("/api/products",{

            search:router.query.search,
            page:router.query.page

        }).then(res => {
            setProducts(res.data.relatedProducts)
            // setTitle(res.data.title)
            setPageInformation(res.data)
            setIsLoading(false)
            console.log(res.data)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)

        })
    },[router.query.search,router.query.page])



    return(
        <Grid container item xs={11} direction={"column"}>
            <Grid item xs>
                {router.query.search &&
                <SectionHeading text={`محصولات مرتبط با جستجو "${router.query.search}"`} />
                }
            </Grid>
            <Grid container item xs spacing={25}>
                {isLoading ? <CircularProgress  color={"primary"} size={45}/> :
                    products.length === 0 ?
                        <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                            <Typography variant={"h2"} fontFamily={"dana-demibold"}>هیچ محصولی مرتبط با جستجو شما موجود نیست !</Typography>
                        </Grid> :
                    products.map((product)=>

                    <Grid item xs={3} key={product._id}>
                        <Product {...product} />
                    </Grid>

                )}

                <Pagination {...pageInformation}  />


            </Grid>
        </Grid>
    )
}

export default Products
