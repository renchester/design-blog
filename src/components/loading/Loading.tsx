import './Loading.scss';

function Loading({ message }: { message?: string }) {
  return (
    <div
      className="loading"
      aria-busy
      role="progressbar"
      aria-label="Loading ripple"
    >
      <div className="loading__ripple">
        <div className="loading__sub"></div>
        <div className="loading__sub"></div>
      </div>

      {message && <p className="loading__message">{message}</p>}
    </div>
  );
}

export default Loading;
