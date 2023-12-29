"use client"
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SectionHeading from "@/components/Globals/SectionHeading";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Product from "@/components/Globals/Product";
import Pagination from "@/components/Globals/Pagination";
import {getAllProducts} from "@/actions/product";
import qs from "query-string";


interface PageInformation {
    lastPage?: number;
    currentPage?: number;
}

function Products() {

    const [products, setProducts] = useState([]);
    const [pageInformation, setPageInformation] = useState<PageInformation>({});
    const [isLoading, setIsLoading] = useState(true);

    const {category, page, sortBy, search} = qs.parse(useSearchParams().toString()) as Record<string, string>;


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const res = await getAllProducts({category, page: +page, sortBy: +sortBy, search})
                setProducts(res.products)
                setPageInformation(res)

            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)

            }

        })()

    }, [category , page , sortBy , search])


    return (
        <Grid container item xs={12} direction={"column"}>
            <Grid item xs>
                {search && !category &&
                    <SectionHeading text={`محصولات مرتبط با ${search}`} sortBy={true}/>
                }
                {/*
                {!router.searchParams.search && +router.searchParams.sortBy === 2 && !router.searchParams.category &&
                    <SectionHeading text={"پرفروش ترین محصولات"} sortBy={true}/>
                }
                {!router.searchParams.search && +router.searchParams.sortBy === 3 && !router.searchParams.category &&
                    <SectionHeading text={"محبوب ترین محصولات"} sortBy={true}/>
                }
                {!router.searchParams.search && (+router.searchParams.sortBy === 1 || !router.searchParams.sortBy) && !router.searchParams.category &&
                    <SectionHeading text={"جدید ترین محصولات"} sortBy={true}/>
                }
                {!router.searchParams.search && router.searchParams.category && router.searchParams.category === "kitchen_poster" &&
                    <SectionHeading text={"پوستر برای آشپزخانه"} sortBy={true}/>
                }
                {!router.searchParams.search && router.searchParams.category && router.searchParams.category === "child_room_poster" &&
                    <SectionHeading text={"پوستر برای اتاق کودک"} sortBy={true}/>
                }
                {!router.searchParams.search && router.searchParams.category && router.searchParams.category === "living_room_poster" &&
                    <SectionHeading text={"پوستر برای حال و پذیرایی"} sortBy={true}/>
                }
                {!router.searchParams.search && router.searchParams.category && router.searchParams.category === "office_poster" &&
                    <SectionHeading text={"پوستر برای اداره و محل کار"} sortBy={true}/>
                }*/}

            </Grid>
            <Grid container item xs spacing={10} alignItems={"center"}>
                {
                    isLoading ?
                        <Grid container item xs justifyContent={"center"}>
                            <CircularProgress color={"primary"} size={45}/>
                        </Grid> :
                        products.length === 0 ?
                            <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                                <Typography fontSize={20} variant={"h2"} color={"#333"} fontFamily={"dana-bold"}>
                                    هیچ محصول مرتبطی موجود نیست !
                                </Typography>
                            </Grid> :
                            products.map((product) =>

                                <Grid item xs={6} sm={4} md={3} key={product._id}>
                                    <Product {...product} />
                                </Grid>
                            )}

                {
                    isLoading || products.length === 0 ?
                        "" :
                        <Pagination {...pageInformation} />
                }


            </Grid>
        </Grid>
    )
}

export default Products
