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
  admin?: boolean;
}
