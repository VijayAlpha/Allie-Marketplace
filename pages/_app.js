import { useEffect, useState } from "react";
import "../styles/globals.css";
import { Wallet, Chain, Network } from "mintbase";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
