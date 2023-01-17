import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css//icofont.min.css";
import "../public/assets/css/animate.css";
import "../public/assets/css/lightcase.css";
import "../public/assets/css/swiper-bundle.min.css";
import "../public/assets/css/style.css";
// import "../public/assets/js/bootstrap.bundle.min.js";
// import "../public/assets/js/waypoints.min.js";
// import "../public/assets/js/lightcase.js";
// import "../public/assets/js/swiper-bundle.min.js";
// import "../public/assets/js/countdown.min.js";
// import "../public/assets/js/jquery.counterup.min.js";
// import "../public/assets/js/wow.min.js";
// import "../public/assets/js/isotope.pkgd.min.js";
// import "../public/assets/js/functions.js";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
