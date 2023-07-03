import './UserPage.scss';
import PostColumn from '@/components/collections/PostColumn';
import { API_URL } from '@/config/config';
import { BlogPost, User } from '@/types/types';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';
import unescapeUser from '@/utils/unescapers/unescapeUser';
import { Metadata } from 'next';
import Link from 'next/link';
import unescape from 'validator/lib/unescape';

type UserPageProps = {
  params: {
    username: string;
  };
};

const getUserDetails = async (username: string) => {
  const response = await fetch(`${API_URL}/api/users?username=${username}`);
  const data = await response.json();
  const user = data.user as User;

  if (user) {
    return unescapeUser(user);
  } else return null;
};

const getUserPosts = async (id: string) => {
  const response = await fetch(`${API_URL}/api/users/${id}/posts`, {
    next: { revalidate: 3600 },
  });
  const data = await response.json();
  const posts = data.posts as BlogPost[];
  const formattedPosts = posts.map((post) => unescapeBlogPost(post));

  return formattedPosts;
};

export async function generateMetadata(
  props: UserPageProps,
): Promise<Metadata> {
  const { username } = props.params;

  const response = await fetch(`${API_URL}/api/users?username=${username}`);
  const data = await response.json();
  const user = data.user as User;

  return {
    title: user ? unescape(user.username) : 'User',
  };
}

async function UserPage(props: UserPageProps) {
  const { username } = props.params;
  const user = await getUserDetails(username);

  if (!user) {
    return <p className="user-page__no-user">Unable to find user</p>;
  }

  const userPosts: BlogPost[] = await getUserPosts(user?._id);

  return (
    <main className="user-page" aria-labelledby="user-page__title">
      <section className="user-page__info">
        <div className="user-page__img-wrapper">
          <img
            src="/logo.png"
            alt="Profile picture"
            className="user-page__img"
          />
        </div>
        <h1 className="user-page__title" id="user-page__title">
          {user.first_name} {user.last_name}
          {user.is_verified_author && (
            <span
              aria-label="User is a verified author on Dezien"
              title="Verified"
            >
              <svg
                className="user-page__verified"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
          )}
        </h1>
        <p className="user-page__username">@{user.username}</p>
      </section>
      <div className="user-page__posts">
        {userPosts.length > 0 ? (
          <section
            aria-labelledby={`user-posts__${user.username}`}
            className="user-page__post-section"
          >
            <h2
              id={`user-posts__${user.username}`}
              className="user-page__post-title"
            >
              Posts by {user.first_name} {user.last_name}
            </h2>
            <PostColumn blogs={userPosts} />

            <Link href={`/latest/1`} className="user-page__post-link">
              See all posts on this app
            </Link>
          </section>
        ) : (
          <p className="user-page__posts--empty">
            This user does not have any posts.
          </p>
        )}
      </div>
    </main>
  );
}

export default UserPage;
