import {CircularProgress, Grid, Typography,} from "@mui/material";
import SectionHeading from "../../components/SectionHeading";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";

const Products = (props) => {
    console.log(props)


    const [products, setProducts] = useState([])
    const [pageInformation, setPageInformation] = useState(1)
    // const [title , setTitle] = useState("همه محصولات")

    const [isLoading, setIsLoading] = useState(false)

    // console.log("hello from products")

    const router = useRouter()
    const {search,page,sortBy,category} = router.query

    useEffect(() => {
        setIsLoading(true)
        axios.post("/api/products", {
            search: search,
            page: +page || 1,
            sortBy: +sortBy || 1,
            category: category

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
    }, [search,page,sortBy])


    return (
        <Grid container item xs={12} direction={"column"}>
            <Grid item xs>
                {router.query.search && !router.query.category &&
                    <SectionHeading text={`محصولات مرتبط با "${router.query.search}"`} sortBy={true}/>
                }
                {!router.query.search && +router.query.sortBy === 2 && !router.query.category &&
                    <SectionHeading text={"پرفروش ترین محصولات"} sortBy={true}/>
                }
                {!router.query.search && +router.query.sortBy === 3 && !router.query.category &&
                    <SectionHeading text={"محبوب ترین محصولات"} sortBy={true}/>
                }
                {!router.query.search && (+router.query.sortBy === 1 || !router.query.sortBy) && !router.query.category &&
                    <SectionHeading text={"جدید ترین محصولات"} sortBy={true}/>
                }
                {!router.query.search && router.query.category && router.query.category === "kitchen_poster" &&
                    <SectionHeading text={"پوستر برای آشپزخانه"} sortBy={true}/>
                }
                {!router.query.search && router.query.category && router.query.category === "child_room_poster" &&
                    <SectionHeading text={"پوستر برای اتاق کودک"} sortBy={true}/>
                }
                {!router.query.search && router.query.category && router.query.category === "living_room_poster" &&
                    <SectionHeading text={"پوستر برای حال و پذیرایی"} sortBy={true}/>
                }
                {!router.query.search && router.query.category && router.query.category === "office_poster" &&
                    <SectionHeading text={"پوستر برای اداره و محل کار"} sortBy={true}/>
                }
                {/*{!router.query.search && router.query.category && router.query.category === "_room_poster" &&*/}
                {/*    <SectionHeading text={"پوستر برای اتاق کودک"} sortBy={true} />*/}
                {/*}*/}
            </Grid>
            <Grid container item xs spacing={10}>
                {isLoading ?
                    <Grid container item xs={12} justifyContent={"center"}>
                        <CircularProgress color={"primary"} size={45}/>
                    </Grid>
                    :
                    products.length === 0 ?
                        <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                            <Typography fontSize={20} variant={"h2"} color={"#333"} fontFamily={"dana-demibold"}>هیچ
                                محصول مرتبطی موجود نیست !</Typography>
                        </Grid> :
                        products.map((product) =>

                            <Grid item xs={6} sm={4} md={3} key={product._id}>
                                <Product {...product} />
                            </Grid>
                        )}

                {isLoading || products.length === 0 ? "" : <Pagination {...pageInformation} />}
                {/*{isLoading || products.length === 0 ? "" :<Pagination color={"primary"}  count={pageInformation.lastPage} size={"large"} /> }*/}


            </Grid>
        </Grid>
    )
}

export async function getStaticProps(context){
    console.log(context.params)
    console.log("hello from getStaticProps")
    return {
        props:{
            name:"hello"
        },
        revalidate: 5
    }

}

export default React.memo(Products)
