import Link from "next/link";

export const MainSection = () => {
  return (
    <section className="hero">
      <div className="hero__col-1">
        <h1 className="hero__heading ma--bottom">This is Allie eve knox.</h1>
        <h3 className="hero__sub-heading text--h2 ma--bottom">
          This is my own marketplace where you can buy NFT to view my content on
          go with NFT.
        </h3>
        <div className="ma--top-side">
          <Link href="#collection">
            <button className="btn btn--1x text-base--1 hero__btn">
              Take a ride
            </button>
          </Link>
        </div>
      </div>
      <div className="col">
        <div className="collection">
          <div className="collection__left">
            <div className="right">
              <img
                src="https://pbs.twimg.com/media/FhiBna1WQAE4Jah?format=jpg&name=small"
                alt="NFT image"
                className="collection__nft ma--bottom"
              />
              <h2 className="collection__name ma--bottom">
                My Birthday celebration
              </h2>
              <p className="collection__description ma--bottom text-base--1">
                This collection is full of me on my Birthday.
              </p>
              <span className="collection__price text--h2 ma--bottom">
                32
                <img
                  src="https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=023"
                  alt="NEAR"
                  className="collection__price--img"
                />
              </span>
            </div>
            <div className="left">
              <button
                className="btn collection__btn"
                id="btn-unlock-collection"
                data-nftid="loyalticket.mintspace2.testnet:8c81bb5b7c8fe197865be325f614770c"
              >
                Unlock Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
