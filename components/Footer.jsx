export const Footer = () => {
  return (
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
  );
};
