/* eslint-disable @next/next/no-img-element */
import { useWallet } from "@mintbase-js/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState();
  const { connect, disconnect, activeAccountId, isConnected } = useWallet();

  const toggleMenu = () => {
    let style;
    if (isMobile) {
      style = toggle ? { width: "150%" } : { width: "0%" };
    } else {
      style = { width: "100%" };
    }

    return style;
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1200);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile, isMobile]);

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="header__content">
          <div className="header__logo">
            <Link href="/">
              <img
                src="/assets/images/logo/logo.png"
                className="logo"
                alt="logo"
              />
            </Link>
          </div>
          {/* <form action="#" className="header__search">
            <input
              type="text"
              placeholder="Search items, collections, and creators"
            />
            <button type="button">
              <i className="icofont-search-2"></i>
            </button>
            <button type="button" className="close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
              </svg>
            </button>
          </form> */}
          <div className="header__menu ms-auto" style={toggleMenu()}>
            {activeAccountId !== process.env.NEXT_PUBLIC_OWNER ? (
              <ul className="header__nav mb-0">
                <li
                  className="header__nav-item"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <Link href="/collection" className="header__nav-link">
                    Collections
                  </Link>
                </li>
                {activeAccountId && (
                  <li
                    className="header__nav-item"
                    onClick={() => {
                      setToggle(false);
                    }}
                  >
                    <Link href="/owned" className="header__nav-link">
                      Owned Collections
                    </Link>
                  </li>
                )}

                <li
                  className="header__nav-item"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <Link href="/tipme" className="header__nav-link">
                    Tip me
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="header__nav mb-0">
                <li
                  className="header__nav-item"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <Link href="/mint" className="header__nav-link">
                    Mint NFT
                  </Link>
                </li>
                <li
                  className="header__nav-item"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <Link href="/list" className="header__nav-link">
                    List NFT
                  </Link>
                </li>
                <li
                  className="header__nav-item"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <Link href="/create" className="header__nav-link">
                    Create
                  </Link>
                </li>
                <li
                  className="header__nav-item"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <Link href="/collection" className="header__nav-link">
                    Collections
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="header__actions">
            <div className="header__action header__action--profile">
              <div className="dropdown">
                <Link
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="-100,10"
                >
                  <span data-blast="bgColor">
                    <i className="icofont-user"></i>
                  </span>{" "}
                  <span className="d-none d-md-inline">{activeAccountId}</span>
                </Link>
              </div>
            </div>
            <div className="wallet-btn pointer">
              {isConnected ? (
                <a onClick={disconnect}>
                  <span>
                    <i className="icofont-wallet" data-blast="color"></i>
                  </span>{" "}
                  <span className="d-none d-md-inline">Disconnect</span>{" "}
                </a>
              ) : (
                <a onClick={connect}>
                  <span>
                    <i className="icofont-wallet" data-blast="color"></i>
                  </span>{" "}
                  <span className="d-none d-md-inline">Connect Wallet</span>{" "}
                </a>
              )}
            </div>
          </div>
          <button
            className="menu-trigger header__btn"
            onClick={handleToggle}
            id="menu05"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
