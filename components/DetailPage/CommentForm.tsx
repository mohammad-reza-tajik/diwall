import React, {useRef} from "react"
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {css} from "@emotion/react";
import {useAppSelector, useAppDispatch, userActions} from "../../store";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";


const styles = {
    commentField: {
        width: 1,
        height: 150,
        px: 20,
        py: 12,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "white.main",
        fontSize: 16,
        resize: "none",
        "&:focus": {
            outline: "2px solid #069f69"
        },
    },
        commentButton: {
            fontSize: {xs:12,md:15},
            width: 200,
            py: 10
        }
}


const CommentForm: React.FC = () => {
    const user = useAppSelector(state => state);
    const commentRef = useRef<HTMLTextAreaElement>();

    const insertCommentHandler = (e) => {
        e.preventDefault();
        console.log("submitted")

    }


    return (
        <>
            {
                user.username ?
                    <Grid container item xs={12} md={7} direction={"column"} gap={10} component={"form"}
                          onSubmit={insertCommentHandler}>
                        <Box component={"textarea"} sx={styles.commentField} ref={commentRef} required />
                        <Button type={"submit"} variant={"contained"} color={"primary"} sx={styles.commentButton} aria-label={"add comment button"}>
                            درج دیدگاه
                        </Button>
                    </Grid>
                    :
                    <Grid container item direction={"column"} justifyContent={"center"} alignItems={"center"} xs={12}
                          p={10}
                          gap={20}>
                        <Typography variant={"h4"} component={"span"} fontSize={16}>
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