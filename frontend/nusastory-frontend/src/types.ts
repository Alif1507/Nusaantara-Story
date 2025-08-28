export type User = {
  id: number;
  name: string;
  email: string;
}

export type Page = {index: number; text?:string; imageUrl?:string}
export type book = {
  id: number;
  title: string;
  subtitle?: string | null;
  slug: string;
  cover_image_url?: string | null;
  status: "draft" | "published";
  pages?: Page[];  
}
