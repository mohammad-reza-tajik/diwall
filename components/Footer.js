import {Box, Button, Grid, IconButton, TextField, Typography,Divider} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {Circle, Instagram, LinkedIn, LocalPhoneOutlined, Telegram, Twitter} from "@mui/icons-material";


const styles = {
    footer_link: {
        fontSize: "1.4rem",
        color: "#444",
        transition: "color .4s",

        "&:hover": {
            color: "primary.main"
        }
    },
    signInField: {
        width: .65
    },
    footer_download_button:{
        fontSize:12,
        fontWeight:700,
        gap:10,
        alignItems:"center",
        color:"#000",
        border:"1px solid #000",
        transition: "all .4s",

        "&:hover" : {
            filter: "invert(32%) sepia(64%) saturate(541%) hue-rotate(107deg) brightness(94%) contrast(102%)"
        },


    }
}

const Footer = () => {

    return (
        <Grid container item xs={11} component={"footer"} justifyContent={"space-around"} mt={100}>
            <Grid container item direction={"column"} xs={2} alignItems={"flex-start"} gap={7}>
                <Grid item mb={10}>
                    <Typography variant={"h5"} color={"#444"} fontSize={18} fontWeight={700}>فروشگاه دیوال</Typography>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>پوستر سفارشی</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>نمونه کارها</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>همکاری با ما</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>تماس با ما</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>درباره ما</Box>
                    </Link>
                </Grid>
            </Grid>
            <Grid container item direction={"column"} xs={2} alignItems={"flex-start"} gap={7}>
                <Grid item mb={10}>
                    <Typography variant={"h5"} color={"#444"} fontSize={18} fontWeight={700}>خدمات دیوال</Typography>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>مشاوره رایگان</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>دیدن آلبوم ها در منزل</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>اندازه گیری دقیق و برآورد هزینه</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>اجرای کار توسط متخصصین</Box>
                    </Link>
                </Grid>
            </Grid>
            <Grid container item direction={"column"} xs={2} alignItems={"flex-start"} gap={7}>
                <Grid item mb={10}>
                    <Typography variant={"h5"} color={"#444"} fontSize={18} fontWeight={700}>خدمات مشتریان</Typography>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>پرسش های متداول</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>تحویل و ارسال کالا</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>سیاست حفظ حریم خصوصی</Box>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Circle sx={{fontSize: 5, color: "#666"}}/>
                    <Link href={"/cloths"}>
                        <Box component={"a"} sx={styles.footer_link}>شرایط و قوانین</Box>
                    </Link>
                </Grid>
            </Grid>

            {/********************************************************************************/}

            <Grid container item direction={"column"} xs={4} alignItems={"flex-start"} gap={7}>
                <Grid item mb={10}>
                    <Typography variant={"h5"} color={"#444"} fontSize={18} fontWeight={700}>دیوال را دنبال
                        کنید</Typography>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10}>
                    <Link href={"/cloths"}>
                        <IconButton>
                            <Telegram color={"primary"}
                                      sx={{fontSize: 50, border: "2px solid #11AE77", borderRadius: "50px", p: 10}}/>
                        </IconButton>
                    </Link>
                    <Link href={"/cloths"}>
                        <IconButton>
                            <Instagram color={"primary"}
                                       sx={{fontSize: 50, border: "2px solid #11AE77", borderRadius: "50px", p: 10}}/>
                        </IconButton>
                    </Link>
                    <Link href={"/cloths"}>
                        <IconButton>
                            <Twitter color={"primary"}
                                     sx={{fontSize: 50, border: "2px solid #11AE77", borderRadius: "50px", p: 10}}/>
                        </IconButton>
                    </Link>
                    <Link href={"/cloths"}>
                        <IconButton>
                            <LinkedIn color={"primary"}
                                      sx={{fontSize: 50, border: "2px solid #11AE77", borderRadius: "50px", p: 10}}/>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={10} mt={15}>
                    <Typography variant={"h4"} fontSize={20} color={"#444"}>
                        از جدیدترین تخفیفات <Box component={"span"}
                                                 sx={{fontFamily:"dana-black", color: "primary.main"}}>دیوال</Box> با خبر شوید!
                    </Typography>
                </Grid>
                <Grid item container direction={"row"} alignItems={"center"} gap={5} mt={15}>
                    <TextField sx={styles.signInField} placeholder={"ایمیل خود را وارد کنید"}/>
                    <Button variant={"contained"} sx={{height: 55, fontSize: 16}}>عضویت</Button>
                </Grid>
            </Grid>

            <Grid container item alignItems={"center"} justifyContent={"space-around"} my={40}>
                <Grid container item direction={"column"} xs={10} gap={10}>
                    <Grid item>
                        <Typography variant={"h4"} color={"#444"} fontFamily={"dana-black"}>الو <Box component={"span"} sx={{
                            color: "primary.main"
                        }}>دیوال</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h5"} color={"#444"}>24 ساعت در هفت روز هفته آماده خدمت رسانی به مشتریان
                            هستیم</Typography>
                    </Grid>

                </Grid>
                <Grid container item direction={"row"} xs={2}>
                    <Grid container item direction={"column"} xs={6}>
                        <Grid item>
                            <Typography fontWeight={700} color={"#888"} fontSize={18}
                                        variant={"subtitle1"}>021464879</Typography>
                        </Grid>
                        <Grid item mt={"-.7rem"}>
                            <Typography color={"#888"} fontSize={12} variant={"subtitle1"}>پشتیبانی مشتریان</Typography>
                        </Grid>

                    </Grid>
                    <Grid item container justifyContent={"center"} alignItems={"flex-end"} xs={2} mr={"-.7rem"}>
                        <Grid item>
                            <LocalPhoneOutlined sx={{fontSize: 35}} color={"primary"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


            <Grid container item justifyContent={"space-between"} alignItems={"center"}>
                <Grid container item direction={"column"} gap={10} xs={8}>
                    <Typography variant={"h4"} color={"#444"} fontFamily={"dana-black"}>فروشگاه اینترنتی <Box component={"span"} sx={{
                        color: "primary.main"
                    }}>دیوال</Box></Typography>
                    <Typography variant={"h5"} color={"#444"}>پوستر دیواری الگوی بسیار مناسبی از یک متریال ایده آل و
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
                <Grid container item xs={3}>
                    <Grid item>
                        <Image src={"/assets/pictures/enamad.png"} alt={"نماد اعتماد الکترونیکی"} width={150} height={150}/>
                    </Grid>
                    <Grid item>
                        <Image src={"/assets/pictures/national_digital_media_badge.png"} alt={"نشان ملی ثبت رسانه های دیجیتال"} width={150} height={150}/>
                    </Grid>
                </Grid>
            </Grid>

            {/*****************************************************************************************/}

            <Grid item mt={20} xs={11}>
                <Divider sx={{width:1,bgcolor:"#ddd"}} />
            </Grid>

            <Grid container item my={40} alignItems={"center"} justifyContent={"space-between"}>
                <Grid container item gap={20} xs={5}>
                    <Link href={"/"} >
                        <Box component={"a"} sx={styles.footer_link}>
                            همکاری با ما
                        </Box>
                    </Link>
                    <Link href={"/"} >
                        <Box component={"a"} sx={styles.footer_link}>
                            سفارش پوستر اختصاصی
                        </Box>
                    </Link>
                    <Link href={"/"} >
                        <Box component={"a"} sx={styles.footer_link}>
                            نمونه کارها
                        </Box>
                    </Link>
                    <Link href={"/"} >
                        <Box component={"a"} sx={styles.footer_link}>
                            راهنمای استفاده
                        </Box>
                    </Link>
                </Grid>
                <Grid container item xs={5} gap={10} alignItems={"center"}>
                    <Typography variant={"h5"} color={"#444"}>
                        دانلود اپلیکیشن دیوال :
                    </Typography>
                    <Button size={"large"} sx={styles.footer_download_button} variant={"outlined"} endIcon={<Image src={"/assets/icons/google_play.svg"} alt={"apple_store"} height={15} width={15} />}>
                        <Box component={"span"} position={"relative"} top={2}>

                            Apple Store
                        </Box>
                    </Button>
                    <Button size={"large"} sx={styles.footer_download_button} variant={"outlined"} endIcon={<Image src={"/assets/icons/apple.svg"} alt={"apple_store"} height={15} width={15} />}>
                        <Box component={"span"} position={"relative"} top={2}>

                        Google Play
                        </Box>
                    </Button>

                </Grid>
            </Grid>
            <Grid item xs={11}>
                <Divider sx={{width:1,bgcolor:"#ddd"}} />
            </Grid>
            <Grid container item justifyContent={"center"} alignItems={"center"} my={20}>
                <Typography variant={"h6"} color={"#444"}>
                    تمامی حقوق مادی و معنوی این سایت متعلق به دیوال می باشد و هر گونه کپی برداری پیگرد قانونی خواهد داشت .
                </Typography>
            </Grid>



        </Grid>
    )
}

export default Footer