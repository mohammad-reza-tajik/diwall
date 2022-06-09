import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import {Fragment} from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import {Grid} from "@mui/material";
import SeenOn from "../components/SeenOn";

const Home = () => {

  return(
      <Grid container direction={"row"} justifyContent={"center"}>

      <Head>
        <title> دیوال : فروشگاه پوستر و کاغذ دیواری </title>
      </Head>
          {/*<Hero />*/}
          {/*<Features />*/}
          <SeenOn />

      </Grid>
  )
}

export default Home