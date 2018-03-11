export interface WordpressPostRequest {
  title: string;
  content: string;
  format: string;
  categories: Number;
  thumbnail: string;
  status: boolean;
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

export interface WordpressAuthData {
  endpoint: string;
  username: string;
  password: string;
}