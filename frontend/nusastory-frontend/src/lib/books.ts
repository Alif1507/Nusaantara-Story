import type { book, Page } from "../types"
import { api } from "./apiToken";

export type BooksInput = {
  title : string;
  coverSubtitle?: string;
  coverImageUrl?: string;
  pages: Page[];  
}

export type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export type PublicBook = {
  id: number;
  title: string;
  cover_url: string | null;
  pages: { id: number; number: number | null; text: string | null; image_url: string | null }[];
};

export const BooksAPI = {
  async list() {
    const { data } = await api.get<Paginated<book>>(`/api/books`);
    return data;
  },

  async get(id: number) {
    const { data } = await api.post<book>(`/api/books/${id}`)
    return data;
  },

  async create(payload: BooksInput) {
    const { data } = await api.post<{id: string}>(`/api/books/`, payload);
    return data;
  },

  async update(id: number | string, payload : BooksInput) {
    const { data } = await api.put<{id: string}>(`/api/books/${id}`, payload)
    return data;
  },

  async remove(id: number | string) {
    await api.delete<void>(`/api/books/${id}`)
  },

  async publish (id: number | string) {
    await api.post<void>(`/api/books/${id}/publish`);
  },

  async uploadImage(file: File) {
  const fd = new FormData();
  fd.append("image", file);


  const { data } = await api.post<{ url: string }>(
    "/api/uploads/images",
    fd
  );
  return data;
},

  async publicBySlug(slug: string): Promise<PublicBook> {
  const res = await fetch(`http://localhost:8000/api/public/books/${slug}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  return json.data; // ← PENTING: Resource Laravel dibungkus "data"
}

  

}