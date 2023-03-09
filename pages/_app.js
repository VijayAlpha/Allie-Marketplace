import { WalletContextProvider } from "@mintbase-js/react";
import "@near-wallet-selector/modal-ui/styles.css";
import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css//icofont.min.css";
import "../public/assets/css/animate.css";
import "../public/assets/css/lightcase.css";
import "../public/assets/css/swiper-bundle.min.css";
import "../public/assets/css/style.css";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WalletContextProvider>
        <Header />
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </WalletContextProvider>
    </>
  );
}

export default MyApp;
