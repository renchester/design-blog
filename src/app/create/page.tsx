import './CreatePostPage.scss';
import CreatePost from '@/components/createPost/CreatePost';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create a post',
};

function CreatePostPage() {
  return (
    <div className="create-page">
      <h1 className="create-page__title">Welcome to the editor suite!</h1>
      <div className="create-page__subtitle">
        <p>
          Add your post details in the editing panel and your changes will be
          reflected in the post preview in real time.
        </p>
        <small className="create-page__disclaimer">
          Note: You must be a verified author to actually submit the post
        </small>
      </div>

      <CreatePost />
    </div>
  );
}

export default CreatePostPage;
