import type { Page } from "../types"
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
    const { data } = await api.get('/api/books');
    return data; // bisa {data:[]} atau array (Dashboard sudah handle)
  },
  async get(id: number) {
    const { data } = await api.get(`/api/books/${id}`);
    return data;
  },
  async create(dto: any) {
    const { data } = await api.post('/api/books', dto);
    return data;
  },
  async update(id: number, dto: any) {
    const { data } = await api.put(`/api/books/${id}`, dto);
    return data;
  },
  async remove(id: number) {
    await api.delete(`/books/${id}`);
  },
  async publish(id: number) {
    const { data } = await api.post(`/api/books/${id}/publish`);
    return data;
  },
  async uploadImage(file: File) {
    const fd = new FormData();
    fd.append('image', file); // samakan dengan key di controller Laravel
    const { data } = await api.post('/api/uploads/images', fd); // JANGAN set Content-Type manual
    return data; // { url: string }
  },
};
  

