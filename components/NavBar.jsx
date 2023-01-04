/* eslint-disable @next/next/no-img-element */
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
        apiKey: process.env.NEXT_PUBLIC_MINTBASE_API,
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
    <header class="header">
      <div class="container-fluid">
        <div class="header__content">
          <div class="header__logo">
            <a href="./">
              <img src="assets/images/logo/logo.png" class="logo" alt="logo" />
            </a>
          </div>

          <form action="#" class="header__search">
            <input
              type="text"
              placeholder="Search items, collections, and creators"
            />
            <button type="button">
              <i class="icofont-search-2"></i>
            </button>
            <button type="button" class="close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
              </svg>
            </button>
          </form>
          <div class="header__menu ms-auto">
            <ul class="header__nav mb-0">
              <li class="header__nav-item">
                <a href="/collection" class="header__nav-link">
                  Collection
                </a>
              </li>

              <li class="header__nav-item">
                <a href="/donate" class="header__nav-link">
                  Donate
                </a>
              </li>
            </ul>
          </div>

          <div class="header__actions">
            <div class="header__action header__action--search">
              <button class="header__action-btn" type="button">
                <i class="icofont-search-1"></i>
              </button>
            </div>

            <div class="header__action header__action--profile">
              <div class="dropdown">
                <a
                  class="dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="-100,10"
                >
                  <span data-blast="bgColor">
                    <i class="icofont-user"></i>
                  </span>{" "}
                  <span class="d-none d-md-inline">Alex Joe</span>
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="author.html">
                      <span class="me-1">
                        <i class="icofont-options"></i>
                      </span>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="activity.html">
                      <span class="me-1">
                        <i class="icofont-lightning-ray"></i>
                      </span>
                      Activity
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="signup.html">
                      <span class="me-1">
                        <i class="icofont-space-shuttle"></i>
                      </span>
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="signin.html">
                      <span class="me-1">
                        <i class="icofont-login"></i>
                      </span>{" "}
                      Sign In
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      {" "}
                      Sign Out{" "}
                      <span class="ms-1">
                        <i class="icofont-logout"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="wallet-btn">
              <a href="wallet.html">
                <span>
                  <i class="icofont-wallet" data-blast="color"></i>
                </span>{" "}
                <span class="d-none d-md-inline">234.98ETH</span>{" "}
              </a>
            </div>
          </div>

          <button class="menu-trigger header__btn" id="menu05">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
