import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Circle from "@mui/icons-material/Circle";
import Link from "next/link";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";

interface Props {
    sortBy?:boolean;
    seeAll?:boolean;
    text:string;
    white?:boolean;
    route?:string

}

const SectionHeading : React.FC<Props> = ({sortBy, route , text , seeAll ,white}) => {

    const [sort, setSort] = useState(1);
    const router = useRouter()

    useEffect(() => {
    if (sortBy && router.query.sortBy){
            setSort(Number(router.query.sortBy))
    }
    }, [])


    const sortChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        setSort(Number(event.target.value));
        router.push({pathname: router.pathname, query: {...router.query, sortBy:event.target.value}})
    }

    return (
        <Grid container item xs={12} alignItems={"center"} justifyContent={"space-between"} my={20}>
            <Grid container item xs={"auto"}  md={8} gap={10} alignItems={"center"}>
                <Circle fontSize={"large"}  sx={{fontSize:{xs:16,md:20},color:!white ? "primary.main" : "white.main"}}/>
                <Typography fontFamily={"dana-black"} variant={"h4"} color={!white ? "#555" : "white.main"} sx={{fontSize: {xs:14,md:20}}} >
                    {text}
                </Typography>
            </Grid>
            {
            seeAll ?
            <Grid container item justifyContent={"flex-end"} xs={"auto"} md={2}>
                    <Button variant={"outlined"} color={!white ? "primary" : "white"}  sx={{fontSize:{xs:12,md:16},borderRadius:1}} component={Link} href={route} aria-label="مشاهده همه">مشاهده همه</Button>
            </Grid> : ""
            }

            {
                sortBy  ?
                    <Grid container item justifyContent={"flex-end"} xs={"auto"}>
                        <Grid container item justifyContent={"flex-end"}  p={5} alignItems={"center"} xs={"auto"} sx={{display:{xs:"none",sm:"block"}} }>
                            <Typography variant={"caption"} fontSize={15}>
                                مرتب سازی بر اساس :
                            </Typography>
                        </Grid>

                        <Grid container item justifyContent={"flex-end"} alignItems={"center"} xs={"auto"}>
                            <Select value={sort} onChange={sortChangeHandler} autoWidth sx={{height:35}}>
                                <MenuItem value={1}>
                                    <Typography variant={"caption"} sx={{fontSize:{xs:12,md:15}}}>جدید
                                        ترین</Typography>
                                </MenuItem>
                                <MenuItem value={2}>
                                    <Typography variant={"caption"} sx={{fontSize:{xs:12,md:15}}}>پرفروش
                                        ترین</Typography>
                                </MenuItem>
                                <MenuItem value={3}>
                                    <Typography variant={"caption"} sx={{fontSize:{xs:12,md:15}}}>محبوب
                                        ترین</Typography>
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid> : ""
            }

        </Grid>
    )
}

export default SectionHeading