export const Footer = () => {
  return (
    <footer className="flex footer">
      <div className="footer__div">
        <div className="flex">
          <img src="/star.svg" className="footer__logo" />
          <h2 className="text--h2 footer__title ma--side">Allie eve knox</h2>
        </div>
        <div className="">
          <ul>
            <li className="footer__list">
              <a href="#">Privacy Policy</a>
            </li>
            <li className="footer__list">
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__div">
        <h4 className="text--h2 footer__title">Follow Me</h4>
        <div className="">
          <a href="#" className="footer__link">
            <img src="/facebook.svg" alt="social-icons" className="footer__img" />
          </a>
          <a href="#" className="footer__link">
            <img
              src="/instagram-alt.svg"
              alt="social-icons"
              className="footer__img"
            />
          </a>
          <a href="#" className="footer__link">
            <img src="/twitter.svg" alt="social-icons" className="footer__img" />
          </a>
          <a href="#" className="footer__link">
            <img src="/google.svg" alt="social-icons" className="footer__img" />
          </a>
        </div>
      </div>
    </footer>
  );
};
