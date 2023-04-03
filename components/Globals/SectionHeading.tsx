import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import Circle from "@mui/icons-material/Circle";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

interface Props {
    sortBy?:boolean;
    seeAll?:boolean;
    text:string;
    white?:boolean;
    route?:string

}

const SectionHeading : React.FC<Props> = (props) => {

    const [sortBy, setSortBy] = useState(1);
    const router = useRouter()



    useEffect(() => {
    if (props.sortBy){
        if (router.query.sortBy)
            setSortBy(+router.query.sortBy)

    }
    }, [])


    const sortChangeHandler = async (e) => {
        setSortBy(e.target.value);

        // I've encountered a major bug and that happens when you try to console.log sortBy right after setSortBy . the value of sort isn't updated.
        await router.push({pathname: router.pathname, query: {...router.query, sortBy:e.target.value}})
    }

    return (
        <Grid container item xs={12} alignItems={"center"} justifyContent={"space-between"} my={30}>
            <Grid container item xs={"auto"}  md={8} gap={10} alignItems={"center"}>
                <Circle fontSize={"large"}  sx={{fontSize:{xs:16,md:20},color:!props.white ? "primary.main" : "white.main"}}/>
                <Typography fontFamily={"dana-black"} variant={"h4"} color={!props.white ? "#555" : "white.main"} sx={{fontSize: {xs:14,md:20}}} >
                    {props.text}
                </Typography>
            </Grid>
            {
            props.seeAll ? 
            <Grid container item justifyContent={"flex-end"} xs={"auto"} md={2}>
                    <Button variant={"outlined"} color={!props.white ? "primary" : "white"}  sx={{fontSize:{xs:12,md:16}}} component={Link} href={props.route} aria-label="visit all product">مشاهده همه</Button>
            </Grid> : ""
            }

            {
                props.sortBy  ?
                    <Grid container item justifyContent={"flex-end"} xs={"auto"}>
                        <Grid container item justifyContent={"flex-end"}  p={5} alignItems={"center"} xs={"auto"} sx={{display:{xs:"none",sm:"block"}} }>
                            <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>
                                مرتب سازی بر اساس :
                            </Typography>
                        </Grid>

                        <Grid container item justifyContent={"flex-end"} alignItems={"center"} xs={"auto"}>
                            <Select value={sortBy} onChange={sortChangeHandler} autoWidth sx={{height:35}}>
                                <MenuItem value={1}>
                                    <Typography variant={"caption"} sx={{fontSize:{xs:12,md:15}}} fontFamily={"dana-medium"}>جدید
                                        ترین</Typography>
                                </MenuItem>
                                <MenuItem value={2}>
                                    <Typography variant={"caption"} sx={{fontSize:{xs:12,md:15}}} fontFamily={"dana-medium"}>پرفروش
                                        ترین</Typography>
                                </MenuItem>
                                <MenuItem value={3}>
                                    <Typography variant={"caption"} sx={{fontSize:{xs:12,md:15}}} fontFamily={"dana-medium"}>محبوب
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