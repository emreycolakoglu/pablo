export interface RedditEntity {
  kind: string;
  data: any;
}
export interface RedditListingData {
  children: RedditEntity[];
  after: string;
  before: string;
}
export interface RedditListingEntity extends RedditEntity {
  data: RedditListingData;
}
export interface RedditLinkData {
  domain: string;
  approved_at_utc?: any;
  banned_by?: any;
  media_embed: RedditMediaEmbed;
  thumbnail_width?: number;
  subreddit: string;
  selftext_html: string;
  selftext: string;
  likes?: any;
  suggested_sort?: any;
  user_reports: any[];
  secure_media: RedditSecureMedia;
  is_reddit_media_domain: boolean;
  link_flair_text: string;
  id: string;
  banned_at_utc?: any;
  view_count?: any;
  archived: boolean;
  clicked: boolean;
  report_reasons?: any;
  title: string;
  num_crossposts: number;
  saved: boolean;
  mod_reports: any[];
  can_mod_post: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  score: number;
  approved_by?: any;
  over_18: boolean;
  hidden: boolean;
  thumbnail: string;
  subreddit_id: string;
  edited: any;
  link_flair_css_class: string;
  author_flair_css_class: string;
  contest_mode: boolean;
  gilded: number;
  downs: number;
  brand_safe: boolean;
  secure_media_embed: RedditSecureMediaEmbed;
  removal_reason?: any;
  author_flair_text: string;
  stickied: boolean;
  can_gild: boolean;
  thumbnail_height?: number;
  parent_whitelist_status: string;
  name: string;
  spoiler: boolean;
  permalink: string;
  subreddit_type: string;
  locked: boolean;
  hide_score: boolean;
  created: number;
  url: string;
  whitelist_status: string;
  quarantine: boolean;
  author: string;
  created_utc: number;
  subreddit_name_prefixed: string;
  ups: number;
  media: RedditMedia;
  num_comments: number;
  is_self: boolean;
  visited: boolean;
  num_reports?: any;
  is_video: boolean;
  distinguished: string;
  preview: {
    images: RedditImage[];
    enabled: boolean;
  };
  post_hint: string;
}
export interface RedditImage {
  source: RedditSource;
  resolutions: RedditResolution[];
  variants: any;
  id: string;
}
export interface RedditResolution {
  url: string;
  width: number;
  height: number;
}
export interface RedditSource {
  url: string;
  width: number;
  height: number;
}
export interface RedditMedia {
  oembed: RedditOembed;
  type: string;
}
export interface RedditOembed {
  provider_url: string;
  description: string;
  title: string;
  type: string;
  thumbnail_width: number;
  height: number;
  width: number;
  html: string;
  version: string;
  provider_name: string;
  thumbnail_url: string;
  thumbnail_height: number;
}
export interface RedditSecureMediaEmbed {
  content: string;
  width?: number;
  scrolling?: boolean;
  media_domain_url: string;
  height?: number;
}
export interface RedditSecureMedia {
  oembed: RedditOembed;
  type: string;
}
export interface RedditMediaEmbed {
  content: string;
  width?: number;
  scrolling?: boolean;
  height?: number;
}
export interface RedditT3Link extends RedditEntity {
  data: RedditLinkData;
}
export interface RedditCommentData {
  domain: string;
  approved_at_utc?: any;
  banned_by?: any;
  media_embed: RedditMediaEmbed;
  thumbnail_width: number;
  subreddit: string;
  selftext_html?: any;
  selftext: string;
  likes?: any;
  suggested_sort?: any;
  user_reports: any[];
  secure_media?: any;
  is_reddit_media_domain: boolean;
  link_flair_text: string;
  id: string;
  banned_at_utc?: any;
  view_count?: any;
  archived: boolean;
  clicked: boolean;
  report_reasons?: any;
  title: string;
  num_crossposts: number;
  saved: boolean;
  can_mod_post: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  score: number;
  approved_by?: any;
  over_18: boolean;
  hidden: boolean;
  preview: {
    images: RedditImage[];
    enabled: boolean;
  };
  num_comments: number;
  thumbnail: string;
  subreddit_id: string;
  hide_score: boolean;
  edited: boolean;
  link_flair_css_class: string;
  author_flair_css_class: string;
  contest_mode: boolean;
  gilded: number;
  locked: boolean;
  downs: number;
  brand_safe: boolean;
  secure_media_embed: RedditSecureMediaEmbed;
  removal_reason?: any;
  post_hint: string;
  can_gild: boolean;
  thumbnail_height: number;
  parent_whitelist_status: string;
  name: string;
  spoiler: boolean;
  permalink: string;
  num_reports?: any;
  whitelist_status: string;
  stickied: boolean;
  created: number;
  url: string;
  author_flair_text: string;
  quarantine: boolean;
  author: string;
  created_utc: number;
  subreddit_name_prefixed: string;
  distinguished?: any;
  media?: any;
  upvote_ratio: number;
  mod_reports: any[];
  is_self: boolean;
  visited: boolean;
  subreddit_type: string;
  is_video: boolean;
  ups: number;
  link_id: string;
  replies: any;
  parent_id: string;
  body: string;
  collapsed?: boolean;
  is_submitter?: boolean;
  collapsed_reason?: any;
  body_html: string;
  score_hidden?: boolean;
  controversiality?: number;
  depth?: number;
}
export interface RedditT1Comment extends RedditEntity {
  data: RedditCommentData;
}
