import './CreatePostPage.scss';
import CreatePost from '@/components/createPost/CreatePost';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create a post',
};

function CreatePostPage() {
  return (
    <div className="create-page">
      <h1 className="create-page__title">Welcome to the Editor Suite!</h1>
      <div className="create-page__subtitle">
        <p>
          Add your post details in the editing panel and your changes will be
          reflected in the post preview.
        </p>
        <small className="create-page__disclaimer">
          Note: You must be a verified author to actually submit a post
        </small>
      </div>

      <CreatePost />
    </div>
  );
}

export default CreatePostPage;
