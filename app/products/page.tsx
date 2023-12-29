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
                setIsLoading(true);
                const res = await getAllProducts({category, page: +page, sortBy, search});
                setProducts(res.products);
                setPageInformation(res);

            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);

            }

        })()

    }, [category , page , sortBy , search]);


    return (
        <Grid container item xs={12} direction={"column"}>
            <Grid item xs>
                {
                    search && <SectionHeading text={`محصولات مرتبط با ${search}`} sortBy={true}/>
                }
                {
                    category &&  <SectionHeading text={`پوستر برای ${category.split("-").join(" ")}`} sortBy={true}/>
                }
                {
                    !category && !search && sortBy && <SectionHeading text={`${sortBy.split("-").join(" ")} محصولات`} sortBy={true}/>
                }

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
                        null :
                        <Pagination {...pageInformation} />
                }


            </Grid>
        </Grid>
    )
}

export default Products
