import './TagPreview.scss';

type TagPreviewProps = {
  tag: string;
  deleteTag: (tag: string) => void;
};

function TagPreview(props: TagPreviewProps) {
  const { tag, deleteTag } = props;

  return (
    <li className="tag-pvw">
      <span aria-label="Post tag" className="tag-pvw__title">
        {tag}
      </span>
      <button
        type="button"
        className="tag-pvw__btn"
        onClick={() => deleteTag(tag)}
      >
        <svg
          className="tag-pvw__btn-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </li>
  );
}
export default TagPreview;
