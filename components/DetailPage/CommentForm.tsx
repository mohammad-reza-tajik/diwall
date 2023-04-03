import React, {useRef, useState} from "react"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "../../store";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Create from "@mui/icons-material/Create";
import Login from "@mui/icons-material/Login";


const styles = {
    commentField: {
        width: 1,
        height: 250,
        px: 20,
        py: 12,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "white.main",
        fontSize: 14,
        resize: "none",
        "&:focus": {
            outline: "2px solid #069f69"
        },
    },
    commentButton: {
        fontSize: {xs: 12, md: 15},
        width: {xs:1,md:200},
        gap:10,
        py: 10
    }
}

interface Props {
    currentProductId:string;
    onAddComment:()=>void
}

const CommentForm: React.FC<Props> = (props) => {
    const user = useAppSelector(state => state);
    const commentRef = useRef<HTMLTextAreaElement>();
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const insertCommentHandler = async (e) => {
        e.preventDefault();
        // console.log(commentRef.current.value)
        try {
            setIsLoading(true)
            await axios.post("/api/add-comment",{
                comment:{
                    content:commentRef.current.value,
                    author:user.username,
                    date: new Date().toLocaleDateString("fa"),
                    productId : props.currentProductId
                }
            })
            commentRef.current.value = ""
            setIsLoading(false);
            props.onAddComment()

        } catch (e) {
            console.log(e)
        }

    }


    return (
        <>
            {
                user.username ?
                    <Grid container item xs={12} md={7} direction={"column"} gap={10} component={"form"}
                          onSubmit={insertCommentHandler}>
                        <Box component={"textarea"} sx={styles.commentField} ref={commentRef} required placeholder="دیدگاه شما ..."/>
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