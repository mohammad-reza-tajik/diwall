import Grid from "@mui/material/Grid";
import Image from "next/legacy/image"
import type {SxProps} from "@mui/material/styles";

const styles = {
    picture: {
        p: {xs: 15, md: 0}
    }
} satisfies Record<string, SxProps>

function ShowCase() {

    return (
        <Grid container item component={"section"} alignItems={"center"} overflow={"hidden"} xs={12} my={50}
              border={"1px solid #ddd"} borderRadius={2}>
            <Grid container justifyContent={"center"} sx={styles.picture} alignItems={"center"} item xs={4} md={2}>
                <Image src={"/assets/pictures/showcase/digistyle.svg"} alt={"دیجی استایل"}
                       width={100} height={100}/>
            </Grid>
            <Grid container justifyContent={"center"} sx={styles.picture} alignItems={"center"} item xs={4} md={2}>
                <Image src={"/assets/pictures/showcase/ganjeh.svg"} alt={"گنجه"}
                       width={100} height={100}/>
            </Grid>
            <Grid container justifyContent={"center"} sx={styles.picture} alignItems={"center"} item xs={4} md={2}>
                <Image src={"/assets/pictures/showcase/fidibo.svg"} alt={"فیدیبو"}
                       width={100} height={100}/>
            </Grid>
            <Grid container justifyContent={"center"} sx={styles.picture} alignItems={"center"} item xs={4} md={2}>
                <Image src={"/assets/pictures/showcase/komoda.svg"} alt={"کمدا"}
                       width={100} height={100}/>
            </Grid>
            <Grid container justifyContent={"center"} sx={styles.picture} alignItems={"center"} item xs={4} md={2}>
                <Image src={"/assets/pictures/showcase/pindo.svg"} alt={"پیندو"}
                       width={100} height={100}/>
            </Grid>
            <Grid container justifyContent={"center"} sx={styles.picture} alignItems={"center"} item xs={4} md={2}>
                <Image src={"/assets/pictures/showcase/magnet.svg"} alt={"مگنت"}
                       width={100} height={100}/>
            </Grid>
        </Grid>
    )
}

export default ShowCase