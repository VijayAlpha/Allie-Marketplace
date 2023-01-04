import "../styles/globals.css";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <NavBar />
      {/* <Component {...pageProps} /> */}
      <Footer />
    </>
  );
}

export default MyApp;