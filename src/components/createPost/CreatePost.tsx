'use client';

import './CreatePost.scss';
import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import useAxiosInterceptors from '@/hooks/useAxiosInterceptors';
import useAuth from '@/hooks/useAuth';
import { BlogCategory } from '@/types/types';
import PostPreview from './PostPreview';
import TagPreview from './TagPreview';
import Switch from '../buttons/Switch';

const categories: BlogCategory[] = [
  'architecture',
  'art',
  'interior-design',
  'lifestyle',
  'style-fashion',
  'tech',
  'travel',
];

export type AuthoredPost = {
  title: string;
  content: string;
  author: string;
  category: BlogCategory;
  display_img: {
    url: string;
    owner: string;
    source?: string;
  };
  is_private: boolean;
  tags: string[];
  currentTag?: string;
};

function CreatePost() {
  const { user } = useAuth();
  const axiosPrivate = useAxiosInterceptors();

  const initialPostState: AuthoredPost = {
    title: 'Dezien Author',
    content: '',
    author: 'Sean Silverico',
    category: 'art',
    display_img: {
      url: 'https://images.unsplash.com/photo-1687728383816-139da84391a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1634&q=80',
      owner: 'Susan Wilkinson',
      source: 'Unsplash',
    },
    tags: [],
    currentTag: '',
    is_private: false,
  };

  const [postData, setPostData] = useState<AuthoredPost>(initialPostState);

  const handleInfoChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDisplayImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPostData((prev) => ({
      ...prev,
      display_img: {
        ...prev.display_img,
        [name]: value,
      },
    }));
  };

  const addTag = (value: string) => {
    const formattedValue = value.toLowerCase();

    if (postData.tags.includes(formattedValue)) return;

    setPostData((prev) => ({
      ...prev,
      tags: [...prev.tags, formattedValue],
      currentTag: '',
    }));
  };

  const deleteTag = (tag: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((currTag) => currTag !== tag),
    }));
  };

  const togglePrivacy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData((prev) => ({
      ...prev,
      is_private: !prev.is_private,
    }));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PanelGroup direction="horizontal" className="create">
      <Panel defaultSize={45} minSize={20} className="create__panel">
        <form action="" className="create__form" onSubmit={handleSubmitPost}>
          <label htmlFor="content-title" className="create__input-wrapper">
            <span className="create__input-label">
              Title<abbr title="required">*</abbr> :
            </span>
            <small className="create__input-sublabel">
              Blog titles must be between 3 and 80 characters long.
            </small>
            <input
              className="create__input"
              id="content-title"
              type="text"
              name="title"
              value={postData.title}
              placeholder="Enter your title here"
              minLength={3}
              maxLength={80}
              onChange={handleInfoChange}
              required
            />
          </label>

          <label htmlFor="content-author" className="create__input-wrapper">
            <span className="create__input-label">
              Author<abbr title="required">*</abbr> :
            </span>

            <input
              className="create__input"
              id="content-author"
              type="text"
              name="author"
              value={postData.author}
              placeholder="Enter your name here"
              minLength={3}
              maxLength={80}
              onChange={handleInfoChange}
              required
            />
          </label>

          <label htmlFor="content-markdown" className="create__input-wrapper">
            <span className="create__input-label">
              Body<abbr title="required">*</abbr> :
            </span>
            <small className="create__input-sublabel">
              This editor uses Markdown to build the content of blog posts. If
              you do not know how to use markdown syntax, see this guide.
            </small>
            <textarea
              className="create__input textarea"
              name="content"
              id="content-markdown"
              value={postData.content}
              onChange={handleInfoChange}
              placeholder="# Hello, *world*!"
              minLength={6}
              required
            ></textarea>
          </label>

          {/* CATEGORY */}
          <label htmlFor="content-category" className="create__input-wrapper">
            <span className="create__input-label">
              Category<abbr title="required">*</abbr> :
            </span>
            <select
              className="create__input"
              name="category"
              id="content-category"
              onChange={handleInfoChange}
              value={postData.category}
            >
              <option value="">Choose a category</option>
              {categories.map((cat) => (
                <option
                  value={cat}
                  key={`option-${cat}`}
                  className="create__input-option"
                >
                  {cat.split('-').join(' ')}
                </option>
              ))}
            </select>
          </label>

          {/* TAGS */}
          <label htmlFor="create-tags" className="create__input-wrapper">
            <span className="create__input-label">Tags:</span>
            <small className="create__input-sublabel">
              Press <code>Enter</code> to submit a tag for this post. Tags that
              are not in any post yet are newly created.
            </small>

            {postData.tags.length > 0 && (
              <ul className="create__tags-list">
                {postData.tags.map((tag) => (
                  <TagPreview
                    tag={tag}
                    deleteTag={deleteTag}
                    key={`tag-pvw--${tag}`}
                  />
                ))}
              </ul>
            )}

            <input
              id="create-tags"
              className="create__input"
              type="text"
              name="currentTag"
              placeholder="Asian Design"
              value={postData.currentTag}
              onChange={handleInfoChange}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                e.preventDefault();
                addTag(e.currentTarget.value);
              }}
            />
          </label>

          {/* DISPLAY IMAGE */}
          <div>
            {/* IMG URL */}
            <label htmlFor="create-img-url" className="create__input-wrapper">
              <span className="create__input-label">
                Display Image<abbr title="required">*</abbr>:
              </span>
              <small className="create__input-sublabel">
                This is the main image to be used as the preview for your post.
                Use a valid image link.
              </small>
              <input
                id="create-img-url"
                className="create__input"
                type="text"
                name="url"
                value={postData.display_img.url}
                onChange={handleDisplayImgChange}
                required
              />
            </label>

            {/* IMG URL */}
            <label htmlFor="create-img-owner" className="create__input-wrapper">
              <span className="create__input-label">
                Display Image Owner<abbr title="required">*</abbr>:
              </span>
              <small className="create__input-sublabel">
                Input the photographer/owner of the image.
              </small>
              <input
                id="create-img-owner"
                className="create__input"
                type="text"
                name="owner"
                placeholder="Jonathan Doe"
                value={postData.display_img.owner}
                onChange={handleDisplayImgChange}
                required
              />
            </label>

            {/* IMG URL */}
            <label
              htmlFor="create-img-source"
              className="create__input-wrapper"
            >
              <span className="create__input-label">Display Image Source:</span>
              <input
                className="create__input"
                type="text"
                placeholder="Unsplash"
                id="create-img-source"
                name="source"
                value={postData.display_img.source || ''}
                onChange={handleDisplayImgChange}
              />
            </label>
          </div>

          {/* IS PRIVATE */}
          <div className="create__input-wrapper">
            <label
              htmlFor="create-post-privacy"
              className="create__input-label"
            >
              Privacy:
            </label>
            <small className="create__input-sublabel">
              Set post privacy. Defaults to false.
            </small>

            <Switch
              isOn={postData.is_private || false}
              id="create-post-privacy"
              ariaLabel="Toggle Post Privacy"
              handler={togglePrivacy}
            />
          </div>

          <button type="submit" className="create__btn-submit">
            Submit Post
          </button>
        </form>
      </Panel>

      <PanelResizeHandle className="create__resizer" />

      <Panel className="create__panel">
        <PostPreview post={postData} />
      </Panel>
    </PanelGroup>
  );
}
export default CreatePost;
