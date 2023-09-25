import React, {CSSProperties} from "react";
import MUIGlobalStyles from "@mui/material/GlobalStyles";
import theme from "@/styles/theme";

const globalStyles = {
    ".swiper" : {
        width : "100%"
    },
    ".swiper-button-prev , .swiper-button-next": {
        backgroundColor: `${theme.palette.primary.main} !important`,
        borderRadius: 5,
        [theme.breakpoints.up('xs')]: {
            width: "40px !important",
            height: "40px !important"
        },
        [theme.breakpoints.up('md')]: {
            width: "50px !important",
            height: "50px !important"
        },
        // @ts-ignore
        "&:after": {
            fontSize: "15px !important",
            color: "#fff",
        }
    },
    "&.notistack-MuiContent" : {
        gap : 10
    },
    "&.go703367398" : {
        marginLeft : "0 !important",
        marginRight : "auto !important",
        padding : "0 !important" ,

    },
    "&.notistack-MuiContent-success": {
        backgroundColor: `${theme.palette.primary.main} !important`,
    },
    "&.notistack-MuiContent-error": {
        backgroundColor: `${theme.palette.error.main} !important`,
    },
    "&.notistack-MuiContent-info": {
        backgroundColor: `${theme.palette.info.main} !important`,
    },
} satisfies Record<string, CSSProperties>


const GlobalStyles : React.FC = () => <MUIGlobalStyles styles={globalStyles}/>

export default GlobalStyles