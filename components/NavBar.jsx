import { useEffect, useState } from "react";
import { Wallet, Chain, Network } from "mintbase";
import Link from "next/link";

export const NavBar = () => {
  const [userName, setUsername] = useState();
  const [wallet, setWallet] = useState();
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    const connect = async () => {
      const { data, error } = await new Wallet().init({
        networkName: Network.testnet,
        chain: Chain.near,
        apiKey: "511a3b51-2ed5-4a27-b165-a27a01eebe0a",
      });
      const { wallet, isConnected } = data;

      setWallet(wallet);
      setIsConnected(isConnected);

      if (isConnected) {
        const { data: details } = await wallet.details();
        setUsername(details.accountId);
      }
    };
    connect();
  }, []);
  return (
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
            onClick={() => wallet.connect({ requestSignIn: true })}
          >
            {userName ? userName : "Connect Wallet"}
          </button>
        </div>
      </div>
    </nav>
  );
};
