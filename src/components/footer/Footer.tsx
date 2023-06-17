import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__col-1">
          <span className="footer__label">Design your life</span>
          <h2 className="footer__title">Get in the Know</h2>
          <p className="footer__info">
            We at Dezien have the utmost passion for discovering and putting the
            spotlight on emerging talents. We are always inspired by the
            community of like-minded design aficionados -- like you!
          </p>
        </div>
        <div className="footer__col-2">
          <section className="footer__links-wrapper">
            <div className="footer__links">
              <h3 className="footer__label">About Dezien</h3>
              <ul className="footer__links-list">
                <li className="footer__link">About Us</li>
                <li className="footer__link">Our Vision</li>
              </ul>
            </div>
            <div className="footer__links">
              <h3 className="footer__label">Contact Us</h3>
              <ul className="footer__links-list">
                <li className="footer__link">Advertise</li>
                <li className="footer__link">Editor&apos;s Column</li>
                <li className="footer__link">Email</li>
              </ul>
            </div>
          </section>

          <small className="footer__small">
            Photos retrieved from Unsplash.
          </small>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
