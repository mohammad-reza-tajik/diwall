import Grid from "@mui/material/Grid";
import React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useRouter} from "next/router";


const styles = {
    drawer: {
        p: 20,
        height: "100vh",
        position: "fixed",
        top: 0,
        zIndex:1000,
        right: 0,
        backgroundColor: "#F8F8F8",
    }

}

interface Props {
    onOpen:any;
    open:boolean;
}

const MenuDrawer: React.FC<Props> = (props) => {

    const theme = useTheme()
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

    const router = useRouter();

    const menuItemsHandler = (url: string) => {

        props.onOpen(false)
        router.push(url)
    }

    return (
            <Grid container item xs={12} width={matchesSM ? "75vw" : "50vw"} sx={{
                ...styles.drawer,
                transition: "all .4s",
                transform: props.open ? "translateX(0)" : "translateX(100%)"
            }}>


                <List sx={{width: 1}}>
                    <ListItem sx={{mb: 20}} onClick={() => menuItemsHandler("/")}>
                        <ListItemIcon sx={{fontSize: 20, cursor: "pointer"}}>
                            <Image src={"/assets/pictures/logo.png"} alt={"dival-logo"}
                                   width={100}
                                   height={100}/>
                        </ListItemIcon>
                    </ListItem>

                    <ListItem onClick={() => menuItemsHandler("/")}>
                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                            صفحه نخست
                        </Typography>
                    </ListItem>
                    <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                    <ListItem onClick={() => menuItemsHandler("/products")}>
                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                            جدیدترین محصولات
                        </Typography>
                    </ListItem>
                    <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                    <ListItem onClick={() => menuItemsHandler("/products?sortBy=2")}>
                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                            پرفروش ترین محصولات
                        </Typography>
                    </ListItem>
                    <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                    <ListItem onClick={() => menuItemsHandler("/products?sortBy=3")}>
                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                            محبوب ترین محصولات
                        </Typography>
                    </ListItem>
                    <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                    <ListItem onClick={() => menuItemsHandler("/about")}>
                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                            درباره ما
                        </Typography>
                    </ListItem>
                    <Divider sx={{width: 1, bgcolor: "#ddd"}}/>

                    <ListItem onClick={() => menuItemsHandler("/collaboration")}>
                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                            همکاری با ما
                        </Typography>
                    </ListItem>

                </List>


            </Grid>

    )

}

export default MenuDrawer;