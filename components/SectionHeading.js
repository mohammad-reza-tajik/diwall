import {Button, Grid, MenuItem, Select, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Circle,} from "@mui/icons-material";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";


const styles = {

    seeAll: {
        fontSize: 16

    },
    title: {

    }
}

const SectionHeading = (props) => {

    const [sortBy, setSortBy] = useState(1);
    const router = useRouter()

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))


    useEffect(() => {
    if (props.sortBy){
        if (router.query.sortBy)
            setSortBy(+router.query.sortBy)

        else
            router.push({pathname: router.pathname, query: {...router.query, sortBy}}).then(()=>{})

    }
    }, [])


    const sortChangeHandler = async (e) => {
        setSortBy(e.target.value);
        // console.log(sortBy)
        // setAge(e.target.value)
        // console.log(age)

        // I've encountered a major bug and that happens when you try to console.log sortBy right after setSortBy . the value of sort isn't updated.
        await router.push({pathname: router.pathname, query: {...router.query, sortBy:e.target.value}})
    }

    return (
        <Grid container item xs={12} alignItems={"center"} justifyContent={"space-between"} my={30}>
            <Grid container item xs={"auto"}  md={8} gap={10} alignItems={"center"}>
                <Circle fontSize={"large"} color={"primary"}/>
                <Typography fontFamily={"dana-black"} variant={"h4"} color={"#444"} sx={{fontSize: {xs:14,md:20}}} >
                    {props.text}
                </Typography>
            </Grid>
            {props.seeAll ? <Grid container item justifyContent={"flex-end"} xs={"auto"} md={2}>
                <Link href={props.route} passHref>
                    <Button variant={"outlined"} sx={{fontSize:{xs:12,md:16}}} component={"a"}>مشاهده همه</Button>
                </Link>
            </Grid> : ""}

            {
                props.sortBy  ?
                    <Grid container item justifyContent={"flex-end"} xs={4}>
                        <Grid container item justifyContent={"flex-end"} alignItems={"center"} xs={5} sx={{display:{xs:"none",sm:"block"}} }>
                            <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>
                                مرتب سازی بر اساس :
                            </Typography>
                        </Grid>

                        <Grid container item justifyContent={"flex-end"} alignItems={"center"} xs={4}>
                            <Select value={sortBy} onChange={sortChangeHandler} autoWidth>
                                <MenuItem value={1}>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>جدید
                                        ترین</Typography>
                                </MenuItem>
                                <MenuItem value={2}>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>پرفروش
                                        ترین</Typography>
                                </MenuItem>
                                <MenuItem value={3}>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>محبوب
                                        ترین</Typography>
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid> : ""
            }

           {/* {
                props.sorting ?


                            <Select id="demo-simple-select" value={age} onChange={sortChangeHandler}>
                                <MenuItem value={1}>
                                   1
                                </MenuItem>
                                <MenuItem value={2}>
                                    2
                                </MenuItem>
                                <MenuItem value={3}>
                                    3
                                </MenuItem>
                            </Select> : ""





            }*/}

        </Grid>
    )
}

export default SectionHeading