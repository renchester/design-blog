import './NotFound.scss';
import Link from 'next/link';

function NotFound() {
  return (
    <main className="error">
      <span className="error__status">Error - 404</span>
      <h1 className="error__main">Uh oh!</h1>
      <div className="error__img-wrapper">
        <img
          src="https://images.unsplash.com/photo-1610337673044-720471f83677?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
          alt="Glitched display"
          className="error__img"
        />
        <span className="error__img-credits">
          Image by{' '}
          <Link
            href="https://unsplash.com/@lazycreekimages"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michael Dziedzic
          </Link>{' '}
          on <Link href="https://unsplash.com/">Unsplash</Link>
        </span>
      </div>

      <h2 className="error__title">This is awkward...</h2>
      <p className="error__text">
        This page is either under construction or just doesn&apos;t exist. Sorry
        about that.
      </p>

      <p className="error__text">Check out our other links!</p>

      <ul className="error__list">
        <li className="error__item">
          <Link className="error__link" href="/">
            Home
          </Link>
        </li>
        <li className="error__item">
          <Link className="error__link" href="/latest/1">
            Latest Posts
          </Link>
        </li>
      </ul>
    </main>
  );
}

export default NotFound;
