import React from "react";
// import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";

interface Props {
    comments: Array<{
        content: string;
        author: string,

    }>
}

const Comments: React.FC<Props> = (props) => {
    return (
        <>
            {/*<List>
              {
                  props.comments.map((comment)=>{
                      return (
                          <li key={comment.author}>
                              {comment.author}
                      </li>
                      )
                  })
              }
          </List>*/}

            <Grid container>
                <Grid container item xs={6} alignItems={"center"} spacing={20}>
                   {/* <Grid item xs={"auto"}>
                        <Image src={"/assets/pictures/logo.png"} width={50} height={50} alt={"logo"}/>
                    </Grid>*/}
                    <Grid container item direction={"column"} xs={true} bgcolor={"white.main"} p={10} gap={10}>


                        <Typography variant={"h4"} component={"span"} fontSize={16}>morta</Typography>
                        <Typography variant={"h4"} component={"span"} fontSize={12}>
                            {
                                 Date()
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={12} py={30} px={50} bgcolor={"white.main"}>
                        <Typography variant={"body1"} component={"p"} fontSize={14} lineHeight={1.7}>
                            امروز، آمریکا قدرت مسلّط جهان نیست؛ بسیاری از تحلیلگران سیاسی دنیا معتقدند که آمریکا دارد رو
                            به افول می‌رود، ذرّه‌ذرّه دارد آب می‌شود. این را نه اینکه ما بگوییم؛ البتّه عقیده‌ی ما هم
                            همین است امّا تحلیلگران سیاسی دنیا هم این را دارند میگویند. نشانه‌هایش هم واضح است؛ مشکلات
                            داخلی آمریکا بی‌سابقه است؛ هم مشکلات اقتصادی‌شان، هم مشکلات اجتماعی‌شان، هم مشکلات
                            اخلاقی‌شان در داخل آمریکا؛ اختلافاتشان، دودستگی‌های خونینشان، خطاهای محاسباتی‌شان در مسائل
                            دنیا… علائم زیادی وجود دارد که نظم کنونی جهان دارد تغییر پیدا می‌کند و نظم جدیدی بر جهان
                            حاکم خواهد شد… در این دنیای جدید ایران چه کاره است؟ ایران کجا قرار می‌گیرد؟ جایگاه کشور عزیز
                            ما کجا است؟ این، آن چیزی است که باید شما روی آن فکر کنید؛ این، آن چیزی است که باید شما
                            خودتان را برایش آماده کنید؛ این آن چیزی است که جوان ایرانی می‌تواند انجام بدهد. ما می‌توانیم
                            در این نظم جدید یک جایگاه برجسته‌ای داشته باشیم ۱۴۰۱/۰۸/۱۱
                        </Typography>
                    </Grid>


                </Grid>

            </Grid>

        </>
    )

}
export default Comments