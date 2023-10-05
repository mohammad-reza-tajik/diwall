import Grid from "@mui/material/Grid";
import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import type {SxProps} from "@mui/system";
import ListItemIcon from "@mui/material/ListItemIcon";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import InfoIcon from '@mui/icons-material/Info';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SellIcon from '@mui/icons-material/Sell';
import MenuList from '@mui/material/MenuList';
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

const styles = {
    drawer: {
        p: 20,
        backgroundColor: "white.main",
        width: {xs: "75vw", sm: "50vw"}
    },
    item: {
        py: "1rem",
        px: 0,
        "&:hover": {
            ".MuiSvgIcon-root": {
                color: "primary.main"
            }
        }
    },
    icon: {
        fontSize: 20,
        transition: "all .5s"

    }

} satisfies Record<string, SxProps>

interface Props {
    setOpenMenuDrawer: (open: boolean) => void;
    openMenuDrawer: boolean;
    iOS: boolean
}

const MenuDrawer: React.FC<Props> = ({openMenuDrawer, setOpenMenuDrawer , iOS}) => {

    const router = useRouter();

    const menuItemsHandler = (url: string) => {
        setOpenMenuDrawer(false)
        router.push(url)
    }

    return (
        <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
                         anchor={"left"} open={openMenuDrawer} onClose={() => setOpenMenuDrawer(false)}
                         onOpen={() => setOpenMenuDrawer(true)}
                         PaperProps={{
                             sx: {
                                 left: 'unset !important',
                                 right: '0 !important'
                             }
                         }}
        >

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
        </SwipeableDrawer>

    )

}

export default MenuDrawer;
