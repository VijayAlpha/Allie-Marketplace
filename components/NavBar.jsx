import { useEffect, useState } from "react";
import { Wallet, Chain, Network } from "mintbase";
import Link from "next/link";

export const NavBar = () => {
  const [userName, setUsername] = useState();
  const [wallet, setWallet] = useState();

  useEffect(() => {
    const connect = async () => {
      const { data, error } = await new Wallet().init({
        networkName: Network.testnet,
        chain: Chain.near,
        apiKey: "511a3b51-2ed5-4a27-b165-a27a01eebe0a",
      });
      const { wallet, isConnected } = data;

      setWallet(wallet);

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
        {userName === "valpha.testnet" ? (
          <div className="nav__list">
            <div className="nav__item">
              <Link href="/collection" className="text-base--2">
                Collections
              </Link>
            </div>

            <div className="nav__item">
              <Link href="/mint" className="text-base--2">
                Mint NFT
              </Link>
            </div>
            <div className="nav__item">
              <Link href="/list" className="text-base--2">
                List NFT
              </Link>
            </div>
            <div className="nav__item">
              <Link href="/create" className="text-base--2">
                Create
              </Link>
            </div>
          </div>
        ) : (
          <div className="nav__list">
            <div className="nav__item">
              <Link href="/collection" className="text-base--2">
                Collection
              </Link>
            </div>
          </div>
        )}

        <div>
          {userName ? (
            <button
              className="btn btn--primary text-base--1"
              onClick={() => wallet.disconnect()}
            >
              {userName}
            </button>
          ) : (
            <button
              className="btn btn--primary text-base--1"
              onClick={() => wallet.connect({ requestSignIn: true })}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
