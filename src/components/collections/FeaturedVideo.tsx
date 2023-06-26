import './FeaturedVideo.scss';
import Link from 'next/link';

function FeaturedVideo() {
  return (
    <section className="fvid">
      <article className="fvid__meta" aria-labelledby="fvid__label">
        <span id="fvid__label" className="fvid__label">
          Featured Video
        </span>
        <h2 id="fvid__title" className="fvid__title">
          Stockholm Design Talks: One-to-one on Stage interview with Ilse
          Crawford
        </h2>
        <p className="fvid__description">
          Hanna Nova Beatrice talks to Ilse Crawford The integrated human
          approach; fusing product design with interior design. As founder of
          Studioilse she brings her philosophy to life. This means creating
          environments where humans feel comfortable; public spaces that make
          people feel at home and homes that are habitable and make sense for
          the people who live in them.
        </p>
        <Link
          href="https://www.youtube.com/watch?v=XlTtQezVrA8"
          target="_blank"
          rel="noopener noreferrer"
          className="fvid__link"
        >
          Watch Now
        </Link>
      </article>

      <figure className="fvid__embed">
        <iframe
          aria-labelledby="fvid__title"
          className="fvid__video"
          width="600"
          height="315"
          src="https://www.youtube.com/embed/XlTtQezVrA8"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </figure>
    </section>
  );
}
export default FeaturedVideo;
