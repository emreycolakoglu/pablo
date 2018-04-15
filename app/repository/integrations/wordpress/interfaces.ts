export interface WordpressPostRequest {
  title: string;
  content: string;
  format: string;
  categories: Number;
  thumbnail: string;
  status?: boolean;
}

export interface WordpressPostResponse {
  id: number;
  date: Date;
  slug: string;
  status: string;
  title: {
    raw: string,
    rendered: string
  };
  categories: number[];
  tags: number[];
}

export interface WordpressAjaxPost extends WordpressPostResponse{
  id: number;
  date: Date;
  date_gmt: string;
  guid: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    raw: string,
    rendered: string
  };
  content: {
    raw: string,
    rendered: string
  };
  excerpt: {
    raw: string,
    rendered: string
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
}

export interface WordpressAuthData {
  endpoint: string;
  username: string;
  password: string;
}