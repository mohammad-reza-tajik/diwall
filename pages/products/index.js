import {CircularProgress, Grid, Typography,} from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import axios from "axios";
import {useEffect, useState,useContext} from "react";
import {useRouter} from "next/router";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";
import loadingContext from "../../store/loading-context";

const Products = () => {


    const [products, setProducts] = useState([])
    const [pageInformation, setPageInformation] = useState(1)
    // const [title , setTitle] = useState("همه محصولات")

    const {isLoading ,setIsLoading} = useContext(loadingContext)

    const router = useRouter()



    useEffect(()=>{
        setIsLoading(true)
        axios.post("/api/products",{
            search:router.query.search,
            page:+router.query.page || 1,
            sortBy:+router.query.sortBy || 1

        }).then(res => {
            // console.log(res.data)
            setProducts(res.data.products)
            // setTitle(res.data.title)
            setPageInformation(res.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)

        })
    },[router.query.search,router.query.page,router.query.sortBy])



    return(
        <Grid container item xs={12} direction={"column"}>
            <Grid item xs>
                {router.query.search &&
                <SectionHeading text={`محصولات مرتبط با جستجو "${router.query.search}"`}  sortBy={true}/>
                }
                {!router.query.search && +router.query.sortBy ===2  &&
                    <SectionHeading text={"پرفروش ترین محصولات"} sortBy={true} />
                }
                {!router.query.search && +router.query.sortBy ===3  &&
                    <SectionHeading text={"محبوب ترین محصولات"} sortBy={true} />
                }
                {!router.query.search && (+router.query.sortBy === 1 || !router.query.sortBy) &&
                    <SectionHeading text={"جدید ترین محصولات"} sortBy={true} />
                }
            </Grid>
            <Grid container item xs spacing={25}>
                {isLoading ? <CircularProgress  color={"primary"} size={45}/> :
                    products.length === 0 ?
                        <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                            <Typography fontSize={20} variant={"h2"} color={"#333"} fontFamily={"dana-demibold"}>هیچ محصولی مرتبط با جستجو شما موجود نیست !</Typography>
                        </Grid> :
                    products.map((product)=>

                    <Grid item xs={3} key={product._id}>
                        <Product {...product} />
                    </Grid>

                )}

                {isLoading || products.length === 0 ? "" :<Pagination {...pageInformation} /> }
                {/*{isLoading || products.length === 0 ? "" :<Pagination color={"primary"}  count={pageInformation.lastPage} size={"large"} /> }*/}


            </Grid>
        </Grid>
    )
}

export default Products
