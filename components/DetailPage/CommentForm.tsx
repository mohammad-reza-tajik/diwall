import React, {FormEvent, useRef, useState} from "react"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "../../store";
import Button from "@mui/material/Button";
import Link from "next/link";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Create from "@mui/icons-material/Create";
import  TextField  from "@mui/material/TextField";


const styles = {
    commentField: {

       
               
        ".MuiInputBase-input" : {
            fontSize: 13,
            px:10,
            lineHeight:1.8,
            "&::-webkit-scrollbar" : {
                width: 5
            },
            
            "&::-webkit-scrollbar-thumb" : {
                borderRadius: 8,
                backgroundClip: "content-box",
                bgcolor: (theme) => theme.palette.primary.main,
            },
        },
        
        ".MuiInputBase-root":{
            bgcolor:"white.main",

        },

        ".MuiFormHelperText-sizeMedium" : {
            color:"primary.main",
            mt:12,
            ml:0,
            fontSize: {xs:12,md:14}
        }
        
    },
    commentButton: {
        fontSize: {xs: 12, md: 15},
        width: {xs:1,md:200},
        gap:10,
        py: 15
    },

}

interface Props {
    currentProductTitle:string;
    onAddComment:()=>void
}

const CommentForm: React.FC<Props> = (props) => {

    const user = useAppSelector(state => state);

    const commentRef = useRef<HTMLTextAreaElement>();

    const [isLoading,setIsLoading] = useState<boolean>(false);

    const [helperText,setHelperText] = useState<string>("")
    // console.log(props.currentProductTitle)

    const insertCommentHandler = async (event : FormEvent) => {
        event.preventDefault();
        // console.log(commentRef.current.value)
        try {
            setIsLoading(true)
            await axios.post(`/api/products/${props.currentProductTitle}/comments`,{
                comment:{
                    content:commentRef.current.value,
                    author:user.username,
                    date: new Date().toLocaleDateString("fa"),
                    prodTitle : props.currentProductTitle
                }
            })
            commentRef.current.value = ""
            setIsLoading(false);
            setHelperText("دیدگاه شما با موفقیت ثبت شد !")
            setTimeout(()=>setHelperText(""),3000)
            props.onAddComment()

        } catch (err) {
            console.log(err)
        }

    }


    return (
        <>
            {
                user.username ?
                    <Grid container item xs={12} md={7} direction={"column"} gap={10} component={"form"}
                          onSubmit={insertCommentHandler}>
                        <TextField multiline minRows={7} sx={styles.commentField} helperText={helperText} maxRows={7} variant="outlined" inputRef={commentRef} required placeholder="دیدگاه شما ..."/>
                        <Button type={"submit"} variant={"contained"} color={"primary"} sx={styles.commentButton} startIcon={isLoading ?
                            <CircularProgress sx={{color: "#fff",position:"relative",top:-2}} size={25}/> :  <Create sx={{color: "#fff",position:"relative",top:-2}}/>  }
                                aria-label={"add comment button"}>
                            درج دیدگاه
                        </Button>
                    </Grid>
                    :
                    <Grid container item direction={"column"} justifyContent={"center"} alignItems={"center"} xs={12}
                          p={10}
                          gap={20}>
                        <Typography variant={"h4"} component={"span"} fontSize={{xs:14,md:16}} textAlign={"center"} lineHeight={1.7}>
                            برای درج دیدگاه باید ابتدا وارد حساب کاربری خود شوید!
                        </Typography>
                        <Button variant={"contained"} color={"primary"} sx={{fontSize: 14}} component={Link}
                                href={"/auth"}>
                            ورود به حساب کاربری
                        </Button>
                    </Grid>
            }
        </>
    )
}

export default CommentForm