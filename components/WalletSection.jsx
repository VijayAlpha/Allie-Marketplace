import Image from "next/image";

export const WalletSection = () => {
  return (
    <section class="wallet-section padding-top padding-bottom">
      <div class="container">
        <div class="section-header style-4">
          <div class="header-shape">
            <span></span>
          </div>
          <h3>All Wallet Options</h3>
        </div>

        <div class="wallet-inner">
          <div class="row g-3">
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="wallet-item home-4">
                <div class="wallet-item-inner text-center">
                  <div class="wallet-thumb">
                    <a href="signin.html">
                    <Image width={60} height={60} src="/my-near-wallet-icon.webp" alt="wallet-img" />
                    </a>
                  </div>
                  <div class="wallet-content">
                    <h5>
                      <a href="signin.html">MyNearWallet</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="wallet-item home-4">
                <div class="wallet-item-inner text-center">
                  <div class="wallet-thumb">
                    <a href="signin.html">
                    <Image width={60} height={60} src="/near-icon.png" alt="wallet-img" />
                    </a>
                  </div>
                  <div class="wallet-content">
                    <h5>
                      <a href="signin.html">Near Wallet</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="wallet-item home-4">
                <div class="wallet-item-inner text-center">
                  <div class="wallet-thumb">
                    <a href="signin.html">
                      <Image width={60} height={60} src="/my-near-wallet-icon.webp" alt="wallet-img" />
                    </a>
                  </div>
                  <div class="wallet-content">
                    <h5>
                      <a href="signin.html">MyNearWallet</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="wallet-item home-4">
                <div class="wallet-item-inner text-center">
                  <div class="wallet-thumb">
                    <a href="signin.html">
                      <Image width={60} height={60} src="/near-icon.png" alt="wallet-img" />
                    </a>
                  </div>
                  <div class="wallet-content">
                    <h5>
                      <a href="signin.html">Near Wallet</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="wallet-item home-4">
                <div class="wallet-item-inner text-center">
                  <div class="wallet-thumb">
                    <a href="signin.html">
                      <Image width={60} height={60} src="/my-near-wallet-icon.webp" alt="wallet-img" />
                    </a>
                  </div>
                  <div class="wallet-content">
                    <h5>
                      <a href="signin.html">MyNearWallet</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
              <div class="wallet-item home-4">
                <div class="wallet-item-inner text-center">
                  <div class="wallet-thumb">
                    <a href="signin.html">
                      <Image width={60} height={60} src="/near-icon.png" alt="wallet-img" />
                    </a>
                  </div>
                  <div class="wallet-content">
                    <h5>
                      <a href="signin.html">Near Wallet</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
