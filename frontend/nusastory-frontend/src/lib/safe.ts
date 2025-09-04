export const toArray = <T>(v: unknown): T[] => Array.isArray(v) ? v as T[] : [];
export const splitTags = (v: unknown): string[] =>
  Array.isArray(v) ? v as string[] : v ? String(v).split(/[;,]\s*/g).filter(Boolean) : [];

export function pickList<T = any>(data: any): T[] {
  // Laravel resource {data:[...]} atau FastAPI {results:[...]} atau array langsung
  if (Array.isArray(data?.data)) return data.data as T[];
  if (Array.isArray(data?.results)) return data.results as T[];
  if (Array.isArray(data)) return data as T[];
  return [];
}
