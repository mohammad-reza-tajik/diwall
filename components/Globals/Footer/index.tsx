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
import ShowCase from "../ShowCase";


const styles = {
    footer_link: {
        fontSize: 14,
        color: "#555",
        transition: "color .4s",

        "&:hover": {
            color: "primary.main"
        }
    },
    signInField: {
        width: 1,
        bgcolor: "#fff",
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
        <>
            <ShowCase/>
            <Grid container item xs={12} component={"footer"} justifyContent={{xs: "center", md: "space-between"}}
                  mt={30}>
                <Grid container item xs={6} md={2} alignItems={"flex-start"} spacing={10}>
                    <Grid item xs={12} mb={10}>
                        <Typography variant={"h5"} color={"#555"} fontSize={18} fontFamily={"dana-bold"}>فروشگاه
                            دیوال</Typography>
                    </Grid>
                    <Grid item container alignItems={"center"} gap={10} xs={12}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>پوستر سفارشی</Box>

                    </Grid>

                    <Grid item container alignItems={"center"} gap={10} xs={12}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>همکاری با ما</Box>

                    </Grid>
                    <Grid item container alignItems={"center"} gap={10} xs={12}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>تماس با ما</Box>

                    </Grid>
                    <Grid item container alignItems={"center"} gap={10} xs={12}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>درباره ما</Box>

                    </Grid>
                </Grid>
                <Grid container item xs={6} md={2} alignItems={"flex-start"} spacing={10}>
                    <Grid item mb={10}>
                        <Typography variant={"h5"} color={"#555"} fontSize={18} fontFamily={"dana-bold"}>خدمات
                            دیوال</Typography>
                    </Grid>
                    <Grid item container alignItems={"center"} gap={10}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>مشاوره رایگان</Box>

                    </Grid>
                    <Grid item container alignItems={"center"} gap={10}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>دیدن آلبوم ها در منزل</Box>

                    </Grid>
                    <Grid item container alignItems={"center"} gap={10}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}> برآورد هزینه</Box>

                    </Grid>
                    <Grid item container alignItems={"center"} gap={10} xs={"auto"}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>اجرای کار توسط متخصصین</Box>

                    </Grid>
                </Grid>
                <Grid container item xs={2} display={{xs: "none", lg: "flex"}} alignItems={"flex-start"} spacing={10}>
                    <Grid item mb={10}>
                        <Typography variant={"h5"} color={"#555"} fontSize={18} fontFamily={"dana-bold"}>
                            خدمات مشتریان
                        </Typography>
                    </Grid>
                    <Grid item container alignItems={"center"} gap={10}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>پرسش های متداول</Box>

                    </Grid>
                    <Grid item container alignItems={"center"} gap={10}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>تحویل و ارسال کالا</Box>

                    </Grid>
                    <Grid item container alignItems={"center"} gap={10}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>سیاست حفظ حریم خصوصی</Box>

                    </Grid>
                    <Grid item container alignItems={"center"} gap={10}>
                        <Circle sx={{fontSize: 5, color: "#666"}}/>

                            <Box component={Link} href={"/cloths"} sx={styles.footer_link}>شرایط و قوانین</Box>

                    </Grid>
                </Grid>

                {/********************************************************************************/}

                <Grid container item xs={12} md={5} lg={4} alignItems={"center"} my={{xs: 30, md: 0}}>
                    <Grid item xs={"auto"} md={12}>
                        <Typography variant={"h5"} color={"#555"} fontSize={{xs: 14, md: 18}} fontFamily={"dana-bold"}>
                            دیوال
                            را دنبال
                            کنید</Typography>
                    </Grid>
                    <Grid item container justifyContent={{xs: "flex-end", md: "flex-start"}} alignItems={"center"} xs
                          md={12}>
                        <Grid item xs={"auto"}>
                            <IconButton component={"a"} href={"https://telegram.org/"} aria-label="telegram">
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
                            <IconButton component={"a"} href={"https://twitter.com/?lang=en"} aria-label="twitter">
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
                            <IconButton component={"a"} href={"https://www.instagram.com/"} aria-label="instagram">
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
                            <IconButton component={"a"} href={"https://www.linkedin.com/"} aria-label="linkedin">
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
                        <Typography variant={"h4"} fontSize={{xs: 16, md: 18}} color={"#555"}>
                            از جدیدترین تخفیفات <Box component={"span"}
                                                     sx={{
                                                         fontFamily: "dana-black",
                                                         color: "primary.main"
                                                     }}>دیوال</Box> با
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
                            <Typography variant={"h4"} color={"#555"} fontFamily={"dana-black"}>الو <Box
                                component={"span"}
                                sx={{
                                    color: "primary.main"
                                }}>دیوال</Box></Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} component={"p"} color={"#555"}>24 ساعت در هفت روز هفته آماده خدمت
                                رسانی به مشتریان
                                هستیم</Typography>
                        </Grid>

                    </Grid>
                    <Grid container item xs={"auto"} justifyContent={"flex-end"}>
                        <Grid container item xs={6}>
                            <Grid item xs={12}>
                                <Typography color={"#888"} fontSize={18} fontFamily={"dana-bold"}
                                            variant={"caption"}>021464879</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color={"#888"} fontSize={12} variant={"caption"}>پشتیبانی
                                    مشتریان</Typography>
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
                        <Typography variant={"h4"} color={"#555"} fontFamily={"dana-black"} fontSize={{xs: 16, md: 20}}>فروشگاه
                            اینترنتی <Box
                                component={"span"} sx={{
                                color: "primary.main"
                            }}>دیوال</Box></Typography>
                        <Typography variant={"h5"} component={"p"} lineHeight={1.5} textAlign={"justify"}
                                    display={"block"} color={"#555"}
                                    fontSize={{xs: 14, md: 16}}>
                            پوستر دیواری الگوی بسیار مناسبی از یک متریال ایده آل و
                            پرکاربرد در
                            دکوراسیون
                            داخلی بوده که توانسته با
                            طیف وسیعی از طرح ها و رنگ های متنوع امروزه به عنوان یکی از محصولات پر طرفدار در امر تزئینات
                            دکوراسیون داخلی قرار گیرد. برترین ویژگی پوستر کاغذ دیواری انعطاف در چاپ طرح های خاص و بر
                            آورده
                            کردن
                            خواسته ها و هماهنگی با رنگ و آیتم های استفاده شده در دکوراسیون داخلی می باشد. پوستر دیواری
                            توانسته
                            با طرح های متنوع میزبان خوبی برای خانه های ما باشد تصاویری که برگرفته از پوستر های دیواری سه
                            بعدی ،
                            پوستر های دیواری مدرن ، پوستر های دیواری برای کسب و کار های مختلف مانند فست فود ، رستوران ،
                            مزون
                            و
                            آرایشگاه ها و مواردی از این جمله باشد. با انتخاب طرح ها در ابعاد مختلف و مقایسه قیمت ،
                            امکانی
                            برای
                            خرید برای شما فراهم می گردد تا ما بتوانیم خدمت ویژه خود را برای شما عزیزان فراهم کنیم.
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={"center"} item xs={12} lg={"auto"}>

                        <Image src={"/assets/pictures/enamad.png"} alt={"نماد اعتماد الکترونیکی"} width={150}
                               height={150}/>


                        <Image src={"/assets/pictures/national_digital_media_badge.png"}
                               alt={"نشان ملی ثبت رسانه های دیجیتال"} width={150} height={150}/>

                    </Grid>
                </Grid>

                {/*****************************************************************************************/}

                <Grid item mt={20} xs={12}>
                    <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                </Grid>

                <Grid container item xs={12} my={40} alignItems={"center"} justifyContent={"space-between"}>
                    <Grid container item gap={20} xs={12} md={"auto"} display={{xs: "none", lg: "flex"}}>

                        <Box component={Link} href={"/"} sx={styles.footer_link}>
                            همکاری با ما
                        </Box>


                        <Box component={Link} href={"/"} sx={styles.footer_link}>
                            سفارش پوستر اختصاصی
                        </Box>


                        <Box component={Link} href={"/"} sx={styles.footer_link}>
                            نمونه کارها
                        </Box>


                        <Box component={Link} href={"/"} sx={styles.footer_link}>
                            راهنمای استفاده
                        </Box>

                    </Grid>

                    <Grid container item xs={12} lg={"auto"} gap={{xs: 20, md: 10}} justifyContent={"space-between"}
                          alignItems={"center"}>
                        <Grid item xs={12} md={"auto"}>

                            <Typography variant={"h5"} color={"#555"}>
                                دانلود اپلیکیشن دیوال :
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} md={"auto"} gap={10}
                              justifyContent={{xs: "center", md: "flex-start"}}>


                            <Button size={"large"} sx={styles.footer_download_button} variant={"outlined"}
                                    endIcon={<svg width={15} height={15} viewBox="0 0 32 32"
                                                  xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20.331 14.644l-13.794-13.831 17.55 10.075zM2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16zM29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8zM6.538 31.188l17.55-10.075-3.756-3.756z"/>
                                    </svg>}>
                                <Box component={"span"} position={"relative"} top={2}>

                                    google play
                                </Box>
                            </Button>
                            <Button size={"large"} sx={styles.footer_download_button} variant={"outlined"}
                                    endIcon={<svg width={15} height={15} version="1.1" id="Layer_1"
                                                  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                  viewBox="0 0 305 305">
                                        <g id="XMLID_228_">
                                            <path id="XMLID_229_" d="M40.738,112.119c-25.785,44.745-9.393,112.648,19.121,153.82C74.092,286.523,88.502,305,108.239,305
		c0.372,0,0.745-0.007,1.127-0.022c9.273-0.37,15.974-3.225,22.453-5.984c7.274-3.1,14.797-6.305,26.597-6.305
		c11.226,0,18.39,3.101,25.318,6.099c6.828,2.954,13.861,6.01,24.253,5.815c22.232-0.414,35.882-20.352,47.925-37.941
		c12.567-18.365,18.871-36.196,20.998-43.01l0.086-0.271c0.405-1.211-0.167-2.533-1.328-3.066c-0.032-0.015-0.15-0.064-0.183-0.078
		c-3.915-1.601-38.257-16.836-38.618-58.36c-0.335-33.736,25.763-51.601,30.997-54.839l0.244-0.152
		c0.567-0.365,0.962-0.944,1.096-1.606c0.134-0.661-0.006-1.349-0.386-1.905c-18.014-26.362-45.624-30.335-56.74-30.813
		c-1.613-0.161-3.278-0.242-4.95-0.242c-13.056,0-25.563,4.931-35.611,8.893c-6.936,2.735-12.927,5.097-17.059,5.097
		c-4.643,0-10.668-2.391-17.645-5.159c-9.33-3.703-19.905-7.899-31.1-7.899c-0.267,0-0.53,0.003-0.789,0.008
		C78.894,73.643,54.298,88.535,40.738,112.119z"/>
                                            <path id="XMLID_230_" d="M212.101,0.002c-15.763,0.642-34.672,10.345-45.974,23.583c-9.605,11.127-18.988,29.679-16.516,48.379
		c0.155,1.17,1.107,2.073,2.284,2.164c1.064,0.083,2.15,0.125,3.232,0.126c15.413,0,32.04-8.527,43.395-22.257
		c11.951-14.498,17.994-33.104,16.166-49.77C214.544,0.921,213.395-0.049,212.101,0.002z"/>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                    }>
                                <Box component={"span"} position={"relative"} top={2}>

                                    apple store
                                </Box>
                            </Button>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                </Grid>
                <Grid container item justifyContent={"center"} alignItems={"center"} my={20}>
                    <Typography variant={"h6"} fontSize={{xs: 12, md: 14}} color={"#555"} textAlign={"center"}>
                        تمامی حقوق مادی و معنوی این سایت متعلق به دیوال می باشد و هر گونه کپی برداری پیگرد قانونی خواهد
                        داشت
                        .
                    </Typography>
                </Grid>


            </Grid>
        </>
    )
}

export default Footer