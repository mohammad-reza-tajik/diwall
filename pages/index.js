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

const Home = () => {

  return(
      <Grid container direction={"row"} justifyContent={"center"}>

      <Head>
        <title> دیوال : فروشگاه پوستر و کاغذ دیواری </title>
      </Head>
          <Header />
          <Hero />
          <Features />
          <Places />
          <SeenOn />
          <Footer />

      </Grid>
  )
}

export default Home