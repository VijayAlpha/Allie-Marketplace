import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { Wallet, Chain, Network } from "mintbase";

function MyApp({ Component, pageProps }) {
  const [userName, setUsername] = useState();
  useEffect(() => {
    const connect = async () => {
      const { data, error } = await new Wallet().init({
        networkName: Network.testnet,
        chain: Chain.near,
        apiKey: "511a3b51-2ed5-4a27-b165-a27a01eebe0a",
      });
      const { wallet, isConnected } = data;

      if (isConnected) {
        const { data: details } = await wallet.details();
        setUsername(details.accountId);
      } else {
        wallet.connect({ requestSignIn: true });
      }
    };
    connect();
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav__col">
          <img src="/star.svg" alt="navbar icon" className="nav__logo" />
          <Link href="/" className="nav__title">
            <h1>Allie eve knox</h1>
          </Link>
        </div>
        <div className="nav__col">
          <div className="nav__list">
            <div className="item">
              <Link href="/collection" className="text-base--2">
                Collection
              </Link>
            </div>
          </div>
          <div>
            <button
              className="btn btn--primary text-base--1"
              onClick={() => connect()}
            >
              {userName ? userName : "connect"}
            </button>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
      <footer class="flex footer">
        <div class="footer__div">
          <div class="flex">
            <img src="/star.svg" class="footer__logo" />
            <h2 class="text--h2 footer__title ma--side">Allie eve knox</h2>
          </div>
          <div class="">
            <ul>
              <li class="footer__list">
                <a href="#">Privacy Policy</a>
              </li>
              <li class="footer__list">
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer__div">
          <h4 class="text--h2 footer__title">Follow Me</h4>
          <div class="">
            <a href="#" class="footer__link">
              <img src="/facebook.svg" alt="social-icons" class="footer__img" />
            </a>
            <a href="#" class="footer__link">
              <img
                src="/instagram-alt.svg"
                alt="social-icons"
                class="footer__img"
              />
            </a>
            <a href="#" class="footer__link">
              <img src="/twitter.svg" alt="social-icons" class="footer__img" />
            </a>
            <a href="#" class="footer__link">
              <img src="/google.svg" alt="social-icons" class="footer__img" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
