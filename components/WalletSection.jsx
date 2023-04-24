import Image from "next/image";

export const WalletSection = () => {
  return (
    <section className="wallet-section padding-top padding-bottom">
      <div className="container">
        <div className="section-header style-4">
          <div className="header-shape">
            <span></span>
          </div>
          <h3>All Wallet Options</h3>
        </div>

        <div className="wallet-inner">
          <div className="row g-3 d-flex justify-content-center">
            <div className="col-lg-2 col-sm-4 col-6">
              <div className="wallet-item home-4">
                <div className="wallet-item-inner text-center">
                  <div className="wallet-thumb">
                    <Image
                      width={60}
                      height={60}
                      src="/assets/images/wallet/ledger-logo.png"
                      alt="wallet-img"
                    />
                  </div>
                  <div className="wallet-content">
                    <h5>
                      <a href="#">Ledger</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-4 col-6">
              <div className="wallet-item home-4">
                <div className="wallet-item-inner text-center">
                  <div className="wallet-thumb">
                    <Image
                      width={60}
                      height={60}
                      src="/assets/images/wallet/my-near-wallet-icon.webp"
                      alt="wallet-img"
                    />
                  </div>
                  <div className="wallet-content">
                    <h5>
                      <a href="#">MyNearWallet</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-4 col-6">
              <div className="wallet-item home-4">
                <div className="wallet-item-inner text-center">
                  <div className="wallet-thumb">
                    <Image
                      width={60}
                      height={60}
                      src="/assets/images/wallet/near-icon.png"
                      alt="wallet-img"
                    />
                  </div>
                  <div className="wallet-content">
                    <h5>
                      <a href="#">Near Wallet</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-sm-4 col-6">
              <div className="wallet-item home-4">
                <div className="wallet-item-inner text-center">
                  <div className="wallet-thumb">
                    <Image
                      width={60}
                      height={60}
                      src="/assets/images/wallet/senderwallet.jpg"
                      alt="wallet-img"
                    />
                  </div>
                  <div className="wallet-content">
                    <h5>
                      <a href="#">Sender</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-4 col-6">
              <div className="wallet-item home-4">
                <div className="wallet-item-inner text-center">
                  <div className="wallet-thumb">
                    <Image
                      width={60}
                      height={60}
                      src="/assets/images/wallet/meteor-wallet.jpg"
                      alt="wallet-img"
                    />
                  </div>
                  <div className="wallet-content">
                    <h5>
                      <a href="#">Meteor</a>
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
