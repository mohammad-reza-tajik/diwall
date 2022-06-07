import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import {Fragment} from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import {Grid} from "@mui/material";

const Home = () => {

  return(
      <Grid container direction={"row"} justifyContent={"center"}>

      <Head>
        <title>فروشگاه پوستر و کاغذ دیواری دیوال</title>
      </Head>
          <Hero />
          <Features />
      </Grid>
  )
}

export default Home