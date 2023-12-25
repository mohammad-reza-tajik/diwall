import {FormEvent, useRef, useState, Dispatch, SetStateAction} from "react"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "@/store";
import Button from "@mui/material/Button";
import Link from "next/link";
import fetcher from "@/utils/fetcher";
import CircularProgress from "@mui/material/CircularProgress";
import Create from "@mui/icons-material/Create";
import TextField from "@mui/material/TextField";
import {useRouter} from "next/router";
import type {SxProps} from "@mui/material/styles";
import {enqueueSnackbar} from "notistack";

const styles = {
    commentField: {
        ".MuiInputBase-input": {
            fontSize: {xs: 13, md: 16},
            px: 10,
            lineHeight: 1.8,
            "&::-webkit-scrollbar": {
                width: 5
            },
            "&::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundClip: "content-box",
                bgcolor: "primary.main",
            },
        },
    },
    commentButton: {
        fontSize: {xs: 12, md: 15},
        width: {xs: 1, md: 200},
        gap: 10,
        py: 15
    },

} satisfies Record<string, SxProps>

interface Props {
    setAddComment: Dispatch<SetStateAction<boolean>>
}

function ReviewsForm({setAddComment}: Props) {

    const user = useAppSelector(state => state.user);

    const router = useRouter();

    const commentRef = useRef<HTMLTextAreaElement>();

    const [isLoading, setIsLoading] = useState(false);

    const slug = router.isReady && router.query.slug;

    const insertCommentHandler = async (event: FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            const res = await fetcher.post(`/api/products/${slug}/comments`, {
                comment: {
                    content: commentRef.current.value,
                    author: user.username,
                    date: new Date().toLocaleDateString("fa"),
                    slug
                }
            })

            if (!res.ok) {
                throw new Error(res.message);
            }

            commentRef.current.value = ""
            enqueueSnackbar(res.message, {
                variant: "success",
            })

            // we are changing this to re-run the useEffect in Reviews component to fetch new comments
            setAddComment((prevState) => !prevState);
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: "error",
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                user.username ?
                    <Grid container item xs={12} md={7} direction={"column"} gap={10} component={"form"}
                          onSubmit={insertCommentHandler}>
                        <TextField multiline minRows={7} sx={styles.commentField} maxRows={7} variant="outlined"
                                   inputRef={commentRef} required placeholder="دیدگاه شما ..."/>
                        <Button disabled={isLoading} type={"submit"} variant={"contained"} color={"primary"}
                                sx={styles.commentButton} startIcon={isLoading ?
                            <CircularProgress color={"inherit"} size={25}/> : <Create sx={{color: "#fff"}}/>}
                                aria-label={"add comment button"}>
                            درج دیدگاه
                        </Button>
                    </Grid>
                    :
                    <Grid container item direction={"column"} justifyContent={"center"} alignItems={"center"} xs={12}
                          p={10}
                          gap={20}>
                        <Typography variant={"h4"} component={"span"} fontSize={{xs: 14, md: 16}} textAlign={"center"}
                                    lineHeight={1.7}>
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

export default ReviewsForm