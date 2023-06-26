import './CallToAction.scss';
import Link from 'next/link';

function CallToAction() {
  return (
    <section className="cta">
      <div className="cta__wrapper">
        <div className="cta__col-1">
          <span className="cta__tag">ATTENTION</span>

          <h2 className="cta__title">Want to be an author in this blog?</h2>
          <p className="cta__description">
            Check out our very own{' '}
            <Link href="/create" className="cta__inline-link">
              test authoring suite!
            </Link>{' '}
            This suite allows you to create, edit, and preview posts in this
            blog!
          </p>
          <Link href="/create" className="cta__link">
            Go to link
          </Link>
        </div>

        <div className="cta__col-2">
          <img
            src="/cta-img.webp"
            alt="Man working on a blog"
            className="cta__img"
          />
          <Link
            href="https://dribbble.com/tatooinegirl"
            rel="noopener noreferrer"
            target="_blank"
            className="cta__img-owner"
          >
            by tatooine_girl
          </Link>
        </div>
      </div>
    </section>
  );
}
export default CallToAction;
