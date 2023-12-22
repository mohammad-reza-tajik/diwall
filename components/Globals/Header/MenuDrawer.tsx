import Grid from "@mui/material/Grid";
import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import type {SxProps} from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import InfoIcon from '@mui/icons-material/Info';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SellIcon from '@mui/icons-material/Sell';
import MenuList from '@mui/material/MenuList';
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Drawer from "react-modern-drawer";

const styles = {
    drawer: {
        p: 20,
        bgcolor: "background.paper",
        width: {xs: "75vw", sm: "50vw"},
        height:"100vh"
    },
    item: {
        py: "1rem",
    },
    icon: {
        fontSize: 20,
    }

} satisfies Record<string, SxProps>

interface Props {
    setOpenMenuDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    openMenuDrawer: boolean;

}

function MenuDrawer ({openMenuDrawer, setOpenMenuDrawer } : Props) {

    const router = useRouter();

    const menuItemsHandler = (url: string) => {
        setOpenMenuDrawer(false);
        router.push(url);
    }

    return (
     <Drawer open={openMenuDrawer} direction={"right"} lockBackgroundScroll onClose={()=>setOpenMenuDrawer(false)} size={"auto"}>
            <Grid container direction={"column"} sx={styles.drawer}>
                <Grid item onClick={() => menuItemsHandler("/")} className={"pointer"}>
                    <Image src={"/assets/pictures/logo.png"} alt={"diwall-logo"}
                           width={100}
                           height={100}/>
                </Grid>
                <MenuList sx={{width: 1}}>
                    <MenuItem sx={styles.item} onClick={() => menuItemsHandler("/")}>
                        <ListItemIcon>
                            <HomeIcon sx={styles.icon}/>
                        </ListItemIcon>
                        <Typography fontSize={12}>صفحه نخست</Typography>
                    </MenuItem>
                    <Divider/>
                    <MenuItem sx={styles.item} onClick={() => menuItemsHandler("/products")}>
                        <ListItemIcon>
                            <WhatshotIcon sx={styles.icon}/>
                        </ListItemIcon>
                        <Typography fontSize={12}> جدیدترین محصولات</Typography>
                    </MenuItem>
                    <Divider/>
                    <MenuItem sx={styles.item} onClick={() => menuItemsHandler("/products?sortBy=2")}>
                        <ListItemIcon>
                            <SellIcon sx={styles.icon}/>
                        </ListItemIcon>
                        <Typography fontSize={12}> پرفروش ترین محصولات</Typography>
                    </MenuItem>
                    <Divider/>
                    <MenuItem sx={styles.item} onClick={() => menuItemsHandler("/products?sortBy=3")}>
                        <ListItemIcon>
                            <FavoriteIcon sx={styles.icon}/>
                        </ListItemIcon>
                        <Typography fontSize={12}>محبوب ترین محصولات</Typography>
                    </MenuItem>
                    <Divider/>
                    <MenuItem sx={styles.item} onClick={() => menuItemsHandler("/about")}>
                        <ListItemIcon>
                            <InfoIcon sx={styles.icon}/>
                        </ListItemIcon>
                        <Typography fontSize={12}>درباره ما</Typography>
                    </MenuItem>
                    <Divider/>
                    <MenuItem sx={styles.item} onClick={() => menuItemsHandler("/collaboration")}>
                        <ListItemIcon>
                            <HandshakeIcon sx={styles.icon}/>
                        </ListItemIcon>
                        <Typography fontSize={12}>همکاری با ما</Typography>
                    </MenuItem>
                </MenuList>
            </Grid>
     </Drawer>

    )

}

export default MenuDrawer;
