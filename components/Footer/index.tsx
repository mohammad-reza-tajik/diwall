import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import Circle from "@mui/icons-material/Circle";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import Telegram from "@mui/icons-material/Telegram";
import Twitter from "@mui/icons-material/Twitter";
import React from "react";


const styles = {
    footer_link: {
        fontSize: 14,
        color: "#444",
        transition: "color .4s",

        "&:hover": {
            color: "primary.main"
        }
    },
    signInField: {
        width: 1
    },
    footer_download_button: {
        fontSize: 12,
        fontWeight: 700,
        gap: 10,
        alignItems: "center",
        color: "#000",
        border: "1px solid #000",
        transition: "all .4s",

        "&:hover": {
            filter: "invert(32%) sepia(64%) saturate(541%) hue-rotate(107deg) brightness(94%) contrast(102%)"
        },


    }
}

const Footer: React.FC = () => {

    return (
        <Grid container item xs={12} component={"footer"} justifyContent={{xs: "center", md: "space-between"}} mt={100}>
            <Grid container item xs={6} md={2} alignItems={"flex-start"} spacing={10}>
                <Grid item xs={12} mb={10}>
                    <Typography variant={"h5"} color={"#444"} fontSize={18} fontFamily={"dana-bold"}>فروشگاه
                        دیوال</Typography>
                </Grid>
                <Grid item container alignItems={"center"} gap={10} xs={12}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>پوستر سفارشی</Box>
                    </Link>
                </Grid>

                <Grid item container alignItems={"center"} gap={10} xs={12}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>همکاری با ما</Box>
                    </Link>
                </Grid>
                <Grid item container alignItems={"center"} gap={10} xs={12}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>تماس با ما</Box>
                    </Link>
                </Grid>
                <Grid item container alignItems={"center"} gap={10} xs={12}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>درباره ما</Box>
                    </Link>
                </Grid>
            </Grid>
            <Grid container item xs={6} md={2} alignItems={"flex-start"} spacing={10}>
                <Grid item mb={10}>
                    <Typography variant={"h5"} color={"#444"} fontSize={18} fontFamily={"dana-bold"}>خدمات
                        دیوال</Typography>
                </Grid>
                <Grid item container alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>مشاوره رایگان</Box>
                    </Link>
                </Grid>
                <Grid item container alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>دیدن آلبوم ها در منزل</Box>
                    </Link>
                </Grid>
                <Grid item container alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}> برآورد هزینه</Box>
                    </Link>
                </Grid>
                <Grid item container alignItems={"center"} gap={10} xs={"auto"}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>اجرای کار توسط متخصصین</Box>
                    </Link>
                </Grid>
            </Grid>
            <Grid container item xs={2} display={{xs: "none", lg: "flex"}} alignItems={"flex-start"} spacing={10}>
                <Grid item mb={10}>
                    <Typography variant={"h5"} color={"#444"} fontSize={18} fontFamily={"dana-bold"}>
                        خدمات مشتریان
                    </Typography>
                </Grid>
                <Grid item container alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>پرسش های متداول</Box>
                    </Link>
                </Grid>
                <Grid item container alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>تحویل و ارسال کالا</Box>
                    </Link>
                </Grid>
                <Grid item container alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>سیاست حفظ حریم خصوصی</Box>
                    </Link>
                </Grid>
                <Grid item container alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>شرایط و قوانین</Box>
                    </Link>
                </Grid>
            </Grid>

            {/********************************************************************************/}

            <Grid container item xs={12} md={5} lg={4} alignItems={"center"} my={{xs: 30, md: 0}}>
                <Grid item xs={"auto"} md={12}>
                    <Typography variant={"h5"} color={"#444"} fontSize={{xs: 14, md: 18}} fontFamily={"dana-bold"}>
                        دیوال
                        را دنبال
                        کنید</Typography>
                </Grid>
                <Grid item container justifyContent={{xs: "flex-end", md: "flex-start"}} alignItems={"center"} xs
                      md={12}>
                    <Grid item xs={"auto"}>
                        <IconButton>
                            <Telegram color={"primary"}
                                      sx={{
                                          fontSize: {xs: 30, md: 50},
                                          border: {xs: "none", md: "2px solid #11AE77"},
                                          borderRadius: "50px",
                                          p: {xs: 1, md: 7}
                                      }}/>
                        </IconButton>
                    </Grid>

                    <Grid item xs={"auto"}>
                        <IconButton>
                            <Twitter color={"primary"}
                                     sx={{
                                         fontSize: {xs: 30, md: 50},
                                         border: {xs: "none", md: "2px solid #11AE77"},
                                         borderRadius: "50px",
                                         p: {xs: 1, md: 7}
                                     }}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={"auto"}>
                        <IconButton>
                            <Instagram color={"primary"}
                                       sx={{
                                           fontSize: {xs: 30, md: 50},
                                           border: {xs: "none", md: "2px solid #11AE77"},
                                           borderRadius: "50px",
                                           p: {xs: 1, md: 7}
                                       }}/>
                        </IconButton>
                    </Grid>

                    <Grid item xs={"auto"}>
                        <IconButton>
                            <LinkedIn color={"primary"}
                                      sx={{
                                          fontSize: {xs: 30, md: 50},
                                          border: {xs: "none", md: "2px solid #11AE77"},
                                          borderRadius: "50px",
                                          p: {xs: 1, md: 7}
                                      }}/>
                        </IconButton>
                    </Grid>


                </Grid>
                <Grid item container alignItems={"center"} gap={10} mt={30} xs={12}>
                    <Typography variant={"h4"} fontSize={{xs: 16, md: 18}} color={"#444"}>
                        از جدیدترین تخفیفات <Box component={"span"}
                                                 sx={{fontFamily: "dana-black", color: "primary.main"}}>دیوال</Box> با
                        خبر شوید!
                    </Typography>
                </Grid>
                <Grid item container alignItems={"center"} gap={5} mt={15} xs={12}>
                    <Grid item xs sm={6} md>
                        <TextField sx={styles.signInField} type={"email"} placeholder={"ایمیل خود را وارد کنید"}/>
                    </Grid>
                    <Grid item xs={"auto"}>
                        <Button variant={"contained"} sx={{height: 55, fontSize: 16}}>عضویت</Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container item alignItems={"center"} justifyContent={"space-between"} my={40} xs={12}
                  display={{xs: "none", md: "flex"}}>
                <Grid container item xs={"auto"} gap={10}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} color={"#444"} fontFamily={"dana-black"}>الو <Box component={"span"}
                                                                                                     sx={{
                                                                                                         color: "primary.main"
                                                                                                     }}>دیوال</Box></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h5"} color={"#444"}>24 ساعت در هفت روز هفته آماده خدمت رسانی به مشتریان
                            هستیم</Typography>
                    </Grid>

                </Grid>
                <Grid container item xs={"auto"} justifyContent={"flex-end"}>
                    <Grid container item xs={6}>
                        <Grid item xs={12}>
                            <Typography color={"#888"} fontSize={18} fontFamily={"dana-bold"}
                                        variant={"subtitle1"}>021464879</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color={"#888"} fontSize={12} variant={"subtitle1"}>پشتیبانی مشتریان</Typography>
                        </Grid>

                    </Grid>
                    <Grid item container alignItems={"flex-end"} xs={"auto"}>
                        <Grid item>
                            <LocalPhoneOutlined sx={{fontSize: 35}} color={"primary"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


            <Grid container item justifyContent={"space-between"} alignItems={"center"} spacing={{xs: 0, lg: 50}}>
                <Grid container item gap={10} xs={12} lg>
                    <Typography variant={"h4"} color={"#444"} fontFamily={"dana-black"} fontSize={{xs: 16, md: 20}}>فروشگاه
                        اینترنتی <Box
                            component={"span"} sx={{
                            color: "primary.main"
                        }}>دیوال</Box></Typography>
                    <Typography variant={"h5"} lineHeight={1.5} textAlign={"justify"} display={"block"} color={"#444"}
                                fontSize={{xs: 14, md: 16}}>پوستر دیواری الگوی بسیار مناسبی از یک متریال ایده آل و
                        پرکاربرد در
                        دکوراسیون
                        داخلی بوده که توانسته با
                        طیف وسیعی از طرح ها و رنگ های متنوع امروزه به عنوان یکی از محصولات پر طرفدار در امر تزئینات
                        دکوراسیون داخلی قرار گیرد. برترین ویژگی پوستر کاغذ دیواری انعطاف در چاپ طرح های خاص و بر آورده
                        کردن
                        خواسته ها و هماهنگی با رنگ و آیتم های استفاده شده در دکوراسیون داخلی می باشد. پوستر دیواری
                        توانسته
                        با طرح های متنوع میزبان خوبی برای خانه های ما باشد تصاویری که برگرفته از پوستر های دیواری سه
                        بعدی ،
                        پوستر های دیواری مدرن ، پوستر های دیواری برای کسب و کار های مختلف مانند فست فود ، رستوران ، مزون
                        و
                        آرایشگاه ها و مواردی از این جمله باشد. با انتخاب طرح ها در ابعاد مختلف و مقایسه قیمت ، امکانی
                        برای
                        خرید برای شما فراهم می گردد تا ما بتوانیم خدمت ویژه خود را برای شما عزیزان فراهم کنیم.
                    </Typography>
                </Grid>
                <Grid container justifyContent={"center"} item xs={12} lg={"auto"}>
                    <Grid item>
                        <Image src={"/assets/pictures/enamad.png"} alt={"نماد اعتماد الکترونیکی"} width={150}
                               height={150}/>
                    </Grid>
                    <Grid item>
                        <Image src={"/assets/pictures/national_digital_media_badge.png"}
                               alt={"نشان ملی ثبت رسانه های دیجیتال"} width={150} height={150}/>
                    </Grid>
                </Grid>
            </Grid>

            {/*****************************************************************************************/}

            <Grid item mt={20} xs={12}>
                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
            </Grid>

            <Grid container item xs={12} my={40} alignItems={"center"} justifyContent={"space-between"}>
                <Grid container item gap={20} xs={12} md={"auto"} display={{xs: "none", lg: "flex"}}>
                    <Link href={"/"}>
                        <Box component={"a"} sx={styles.footer_link}>
                            همکاری با ما
                        </Box>
                    </Link>
                    <Link href={"/"}>
                        <Box component={"a"} sx={styles.footer_link}>
                            سفارش پوستر اختصاصی
                        </Box>
                    </Link>
                    <Link href={"/"}>
                        <Box component={"a"} sx={styles.footer_link}>
                            نمونه کارها
                        </Box>
                    </Link>
                    <Link href={"/"}>
                        <Box component={"a"} sx={styles.footer_link}>
                            راهنمای استفاده
                        </Box>
                    </Link>
                </Grid>

                <Grid container item xs={12} lg={"auto"} gap={{xs: 20, md: 10}} justifyContent={"space-between"}
                      alignItems={"center"}>
                    <Grid item xs={12} md={"auto"}>

                        <Typography variant={"h5"} color={"#444"}>
                            دانلود اپلیکیشن دیوال :
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} md={"auto"} gap={10} justifyContent={{xs: "center", md: "flex-start"}}>


                        <Button size={"large"} sx={styles.footer_download_button} variant={"outlined"}
                                endIcon={<Image src={"/assets/icons/google_play.svg"} alt={"apple_store"} height={15}
                                                width={15}/>}>
                            <Box component={"span"} position={"relative"} top={2}>

                                Apple Store
                            </Box>
                        </Button>
                        <Button size={"large"} sx={styles.footer_download_button} variant={"outlined"}
                                endIcon={<Image src={"/assets/icons/apple.svg"} alt={"apple_store"} height={15}
                                                width={15}/>}>
                            <Box component={"span"} position={"relative"} top={2}>

                                Google Play
                            </Box>
                        </Button>

                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
            </Grid>
            <Grid container item justifyContent={"center"} alignItems={"center"} my={20}>
                <Typography variant={"h6"} fontSize={{xs: 12, md: 14}} color={"#444"} textAlign={"center"}>
                    تمامی حقوق مادی و معنوی این سایت متعلق به دیوال می باشد و هر گونه کپی برداری پیگرد قانونی خواهد داشت
                    .
                </Typography>
            </Grid>


        </Grid>
    )
}

export default Footer