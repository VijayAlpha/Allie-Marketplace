export const HowItWorks = () => {
  return (
    <section className="section-how-it-works section text--center">
      <div className="container">
        <h2 className="text--h2 ma--bottom">How it works</h2>
        <h1 className="HIW text--h1">Mint, Watch and Sell.</h1>
      </div>
      <div className="container flex">
        <div className="">
          <img className="HIW__img" src="/master-card.svg" alt="" />
          <h3 className="HIW__text">Buy NFT</h3>
        </div>
        <div className="">
          <img className="HIW__img" src="/unlock-alt.svg" alt="" />
          <h3 className="HIW__text">Unlock Content</h3>
        </div>
        <div className="">
          <img className="HIW__img" src="/image-v.svg" alt="" />
          <h3 className="HIW__text">Watch</h3>
        </div>
        <div className="">
          <img className="HIW__img" src="/process.svg" alt="" />
          <h3 className="HIW__text">Resell NFT</h3>
        </div>
      </div>
    </section>
  );
};
