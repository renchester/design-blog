import './FeaturedTags.scss';
import { Tag } from '@/types/types';
import Link from 'next/link';

type FeaturedTagsProps = {
  tags: Tag[];
};

function FeaturedTags(props: FeaturedTagsProps) {
  const { tags } = props;
  const featuredTags = tags.slice(0, 3);

  return (
    <section className="hp-tags">
      <div className="hp-tags__wrapper">
        <h2 className="hp-tags__title">Featured tags</h2>
        <ul className="hp-tags__list">
          {featuredTags.map((tag) => (
            <li key={`hp-tags__${tag._id}`} className="hp-tags__item">
              <Link href={`/tag/${tag.name}`} className="hp-tags__tag">
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default FeaturedTags;
