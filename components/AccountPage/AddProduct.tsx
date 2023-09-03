import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import {useAppSelector} from "@/hooks/useStore";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Add, Upload} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import useFetch from "@/hooks/useFetch";
import type { SxProps } from '@mui/system';



const styles : Record<string, SxProps> = {
    fields: {
        width: 1
    },
    buttons: {
        height: 1,
        width: 200,
        py: 15,
        fontSize: "1.6rem",
        gap: 10
    },
    removeUploadButton : {
        p : "1rem",
        fontSize: {xs: 30, sm: 40},
    }
}

const AddProduct: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("");

    const user = useAppSelector((state)=> state.userReducer);

    const titleRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const categoriesRef = useRef<HTMLInputElement>(null);
    const imagesRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const addProductHandler = async (event: FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const formData : any = new FormData();
            formData.append("title", titleRef.current.value);
            formData.append("price", priceRef.current.value);
            formData.append("quantity", quantityRef.current.value);
            formData.append("categories", categoriesRef.current.value.split(" "));
            formData.append("description", descriptionRef.current.value);
            formData.append("images", imagesRef.current.files);

            const res = await useFetch.post("http://127.0.0.1:3000/api/products" , {formData});


            console.log("it works")

        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)

        }

    }

    const uploadImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUploadedFileName(event.target .value)
    }


    return (
        <Grid container item xs={12} py={20} px={{xs: 5, md: 40}} spacing={20} component={"form"}
              onSubmit={addProductHandler}>
            <Grid item xs={12}>
                <Typography variant={"h4"} component={"h1"} fontFamily={"dana-bold"} color={"#555"}>
                    افزودن محصول جدید
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField color={"primary"} placeholder={"عنوان ..."} sx={styles.fields} inputRef={titleRef}/>
            </Grid>
            <Grid item xs={6}>
                <TextField color={"primary"} placeholder={"قیمت ..."} sx={styles.fields} inputRef={priceRef}/>
            </Grid>
            <Grid item xs={6}>
                <TextField color={"primary"} placeholder={"تعداد ..."} sx={styles.fields} inputRef={quantityRef}/>
            </Grid>
            <Grid item xs={6}>
                <TextField color={"primary"} placeholder={"دسته بندی ها ..."} sx={styles.fields}
                           inputRef={categoriesRef}/>
            </Grid>
            <Grid item xs={12}>
                <TextField color={"primary"} placeholder={"توضیحات ..."} sx={styles.fields} multiline rows={7}
                           inputRef={descriptionRef}/>
            </Grid>
            <Grid container item xs={12} justifyContent={"space-between"} alignItems={"center"}>
                <Grid item xs={"auto"}>
                    { /* @ts-ignore */}
                    <Grid ref={imagesRef} component={"input"} id={"images"} type={"file"} multiple accept={"image/*"}
                          sx={{display: "none"}} onChange={uploadImageChangeHandler}/>
                    {
                        uploadedFileName === "" ?
                            <Button variant={"contained"} sx={styles.buttons} color={"primary"} component={"label"}
                                    htmlFor={"images"}
                                    startIcon={<Upload/>}>آپلود</Button> :
                            <Grid container item xs={12} alignItems={"center"} gap={5} sx={{px: 10, py : 5 ,border : (theme) => `1px solid ${theme.palette.primary.main} `}}>
                                <Grid item xs>
                                    <Typography variant={"h6"}>{uploadedFileName.replace(/[A-Za-z]+:\\[A-Za-z]+\\/ , "")}</Typography>
                                </Grid>
                                <Grid item xs={"auto"}>
                                    <IconButton onClick={() => setUploadedFileName("")} color={"primary"} sx={{p:5}}>
                                        <Close />
                                    </IconButton>
                                </Grid>
                            </Grid>
                    }
                </Grid>
                <Grid item xs={"auto"}>
                    <Button type={"submit"} variant={"contained"} sx={styles.buttons} color={"primary"}
                            startIcon={isLoading ? <CircularProgress/> : <Add/>}>افزودن محصول</Button>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default AddProduct