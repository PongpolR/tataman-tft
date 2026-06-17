export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: PostStatus;
  published_at: string | null;
  header: string;
  header_desc: string[];
  body: string[];
  img: string | null;
  img_desc: string;
  body2: string[];
  img2: string | null;
  img2_desc: string;
  summary: string[];
  ref: string[];
  created_at: string;
  updated_at: string;
}

export interface PostFormData {
  slug: string;
  title: string;
  description: string;
  status: PostStatus;
  header: string;
  header_desc: string[];
  body: string[];
  img: string;
  img_desc: string;
  body2: string[];
  img2: string;
  img2_desc: string;
  summary: string[];
  ref: string[];
}
