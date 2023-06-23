export type BlogCategory =
  | 'architecture'
  | 'art'
  | 'interior design'
  | 'lifestyle'
  | 'style + fashion'
  | 'tech'
  | 'travel';

export interface User {
  _id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  is_verified_author: boolean;
}

export interface BlogPost {
  _id: string;
  date_created: Date;
  title: string;
  slug: string;
  author: User;
  editors: User[];
  content: string;
  comments: Comment[];
  liked_by: User[];
  tags: Tag[];
  edits: {
    timestamp: Date;
  }[];
  is_private: boolean;
  category: BlogCategory;
  display_img: {
    url: string;
    owner: string;
    source: string;
  };
}

export interface Comment {
  _id: string;
  date_created: Date;
  author: User;
  content: string;
  comment_level: number;
  parent_comment_id: string;
  liked_by: User[];
  edits: {
    timestamp: Date;
  }[];
}

export interface Tag {
  _id: string;
  name: string;
}

export type Alert = {
  message: string;
  status: 'success' | 'error' | 'neutral';
};
