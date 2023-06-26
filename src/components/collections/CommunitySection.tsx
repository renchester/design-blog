import './CommunitySection.scss';
import Link from 'next/link';

function CommunitySection() {
  return (
    <section className="community">
      <div className="community__header">
        <h2 className="community__title">The Dezien Community</h2>
        <span className="community__subtitle">Follow us on our socials</span>
      </div>

      <ul className="community__socials">
        <li className="community__social-link tiktok">
          <button aria-label="Link to Tiktok" type="button">
            <svg
              className="community__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22.5 9.84202C20.4357 9.84696 18.4221 9.20321 16.7435 8.00171V16.3813C16.7429 17.9333 16.2685 19.4482 15.3838 20.7233C14.499 21.9984 13.246 22.973 11.7923 23.5168C10.3387 24.0606 8.75362 24.1477 7.24914 23.7664C5.74466 23.3851 4.39245 22.5536 3.37333 21.383C2.3542 20.2125 1.71674 18.7587 1.54617 17.2161C1.3756 15.6735 1.68007 14.1156 2.41884 12.7507C3.15762 11.3858 4.2955 10.279 5.68034 9.57823C7.06517 8.87746 8.63095 8.61616 10.1683 8.82927V13.0439C9.4648 12.8227 8.70938 12.8293 8.0099 13.063C7.31041 13.2966 6.70265 13.7453 6.2734 14.345C5.84415 14.9446 5.61536 15.6646 5.6197 16.402C5.62404 17.1395 5.8613 17.8567 6.29759 18.4512C6.73387 19.0458 7.34688 19.4873 8.04906 19.7127C8.75125 19.9381 9.5067 19.9359 10.2075 19.7063C10.9084 19.4768 11.5188 19.0316 11.9515 18.4345C12.3843 17.8374 12.6173 17.1188 12.6173 16.3813V0H16.7435C16.7406 0.348435 16.7698 0.696395 16.8307 1.03948V1.03948C16.9741 1.80537 17.2722 2.53396 17.7068 3.18068C18.1415 3.8274 18.7035 4.37867 19.3585 4.80075C20.2903 5.41688 21.3829 5.74528 22.5 5.74505V9.84202Z" />
            </svg>
          </button>
        </li>
        <li className="community__social-link twitter">
          <button aria-label="Link to Twitter" type="button">
            <svg
              className="community__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
            </svg>
          </button>
        </li>
        <li className="community__social-link instagram">
          <button type="button" aria-label="Link to Instagram">
            <svg
              className="community__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
            </svg>
          </button>
        </li>
        <li className="community__social-link facebook">
          <button type="button" aria-label="Link to Facebook">
            <svg
              className="community__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22.5 0c.83 0 1.5.67 1.5 1.5v21c0 .83-.67 1.5-1.5 1.5h-6v-9h3l.75-3.75H16.5v-1.5c0-1.5.75-2.25 2.25-2.25h1.5V3.75h-3c-2.76 0-4.5 2.16-4.5 5.25v2.25h-3V15h3v9H1.5A1.5 1.5 0 0 1 0 22.5v-21C0 .67.67 0 1.5 0h21z" />
            </svg>
          </button>
        </li>
        <li className="community__social-link youtube">
          <button aria-label="Link to Youtube" type="button">
            <svg
              className="community__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z" />
            </svg>
          </button>
        </li>
        <li className="community__social-link behance">
          <button aria-label="Link to Behance" type="button">
            <svg
              className="community__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18.53 8.12c5.77 0 5.08 6.08 5.05 6.28v.01h-7.51c0 2.7 2.55 2.52 2.55 2.52 2.33 0 2.33-1.46 2.32-1.55h2.56c0 4.13-4.97 3.85-4.97 3.85-5.95 0-5.57-5.54-5.57-5.54v-.02c0-.37.2-5.55 5.57-5.55zM.23 4.42h7.55c2.3 0 4.1 1.27 4.1 3.87s-2.2 2.76-2.2 2.76c2.91 0 2.7 3.6 2.7 3.6 0 4.06-3.88 4.27-4.51 4.28H.24V4.43h7.54H.24zm7.55 8.06H3.56v3.87h4.01c.6-.01 1.74-.19 1.74-1.88 0-1.87-1.32-1.99-1.5-2h-.02zm10.8-2.24c-2.16 0-2.52 2.09-2.54 2.23h4.76v-.02c0-.25-.11-2.21-2.21-2.21zM7.79 7H3.56v3.24h3.96c.68 0 1.29-.22 1.29-1.73 0-1.38-.86-1.5-1-1.5h-.02zM21.4 5.28v1.79h-5.98V5.28h5.98z" />
            </svg>
          </button>
        </li>
      </ul>

      <ul className="community__gallery">
        <li className="community__gallery-item">
          <Link
            href="https://unsplash.com/@ninjason"
            className="community__img-owner"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jason Leung
          </Link>
          <img
            className="community__img"
            src="https://images.unsplash.com/photo-1687380223135-2028215f3c6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            alt="Sample photo"
          />
        </li>
        <li className="community__gallery-item">
          <Link
            href="https://unsplash.com/@joellseverino"
            className="community__img-owner"
            target="_blank"
            rel="noopener noreferrer"
          >
            Joel Severino
          </Link>
          <img
            className="community__img"
            src="https://images.unsplash.com/photo-1687579520873-19a04c4eb297?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
            alt="Sample photo"
          />
        </li>
        <li className="community__gallery-item">
          <Link
            href="https://unsplash.com/@bady"
            className="community__img-owner"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bady Abbas
          </Link>
          <img
            className="community__img"
            src="https://images.unsplash.com/photo-1687591222784-41b886039512?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
            alt="Sample photo"
          />
        </li>
        <li className="community__gallery-item">
          <Link
            href="https://unsplash.com/@joellseverino"
            className="community__img-owner"
            target="_blank"
            rel="noopener noreferrer"
          >
            Joel Severino
          </Link>
          <img
            className="community__img"
            src="https://images.unsplash.com/photo-1687579520792-eae9e274a3ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
            alt="Sample photo"
          />
        </li>
        <li className="community__gallery-item">
          <Link
            href="https://unsplash.com/@anastasiya_dalenka"
            className="community__img-owner"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anastasiya Dalenka
          </Link>
          <img
            className="community__img"
            src="https://images.unsplash.com/photo-1687154156757-25b60bb3892d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
            alt="Sample photo"
          />
        </li>
      </ul>
    </section>
  );
}

export default CommunitySection;
