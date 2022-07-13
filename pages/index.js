import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import {Fragment} from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import {Grid} from "@mui/material";
import SeenOn from "../components/SeenOn";
import Places from "../components/Places";
import Footer from "../components/Footer";
import LatestProducts from "../components/LatestProducts";
import SectionHeading from "../components/SectionHeading";
import BestSoldProducts from "../components/BestSoldProducts";
import MiddleSection from "../components/MiddleSection";
import DiscountSection from "../components/DiscountSection";

/*const person1 = {

    name:"peter",
    lastname:"parker",
    age:25

}*/

// const {namee = 50,lastname:surname} = person1

const Home = () => {

  return(
      <Grid container direction={"row"} justifyContent={"center"}>

      <Head>
        <title> دیوال : فروشگاه پوستر و کاغذ دیواری </title>
      </Head>
          <Header />
          {/*<Hero />*/}
          {/*<Features />*/}
          {/*<Places />*/}
          {/*<DiscountSection />*/}
          {/*<SectionHeading text={"محصولات جدید"} />*/}
          {/*<SectionHeading text={namee} />*/}
          {/*<SectionHeading text={surname} />*/}
          {/*<LatestProducts />*/}
          {/*<MiddleSection />*/}
          {/*<SectionHeading text={"پر فروش ترین محصولات"} />*/}
          {/*<BestSoldProducts />*/}
          {/*<SeenOn />*/}
          {/*<Footer />*/}

      </Grid>
  )
}

export default Home