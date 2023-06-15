import Link from 'next/link';
import Image from 'next/image';
import './NavPanel.scss';

type NavPanelProps = {
  isExpanded: boolean;
};

function NavPanel(props: NavPanelProps) {
  const { isExpanded } = props;

  return (
    <nav id="nav-panel" aria-hidden={isExpanded} className="nav">
      <div className="nav__col-1">
        <h3 className="nav__label">Topics</h3>
        <ul className="nav__links">
          <li className="nav__link">
            <Link href="/category/architecture">Architecture</Link>
          </li>
          <li className="nav__link">
            <Link href="/category/art">Art</Link>
          </li>
          <li className="nav__link">
            <Link href="/category/interior-design">Interior Design</Link>
          </li>
          <li className="nav__link">
            <Link href="/category/lifestyle">Lifestyle</Link>
          </li>
          <li className="nav__link">
            <Link href="/category/style-fashion">Style + Fashion</Link>
          </li>
          <li className="nav__link">
            <Link href="/category/tech">Tech</Link>
          </li>
          <li className="nav__link">
            <Link href="/category/travel">Travel</Link>
          </li>
        </ul>
      </div>
      <div className="nav__col-2">
        <ul className="nav__featured">
          <li className="nav__article">
            {/* IMAGE HERE */}
            <Link className="nav__label" href="/category/art">
              Art
            </Link>
            <h2 className="nav__article-title">
              Best of 2023: Architecture, Reclamation, and Blobs
            </h2>
          </li>
          <li className="nav__article">
            {/* IMAGE HERE */}
            <Link className="nav__label" href="/category/architecture">
              Interiors
            </Link>
            <h2 className="nav__article-title">
              Best of 2023: Architecture, Reclamation, and Blobs
            </h2>
          </li>
        </ul>

        <div className="nav__columns">
          <h4 className="nav__label">Columns</h4>
          <ul className="nav__column-group">
            <li className="nav__column">Our team</li>
            <li className="nav__column">Circulars</li>
            <li className="nav__column">Deconstruction</li>
            <li className="nav__column">Destinations</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default NavPanel;
