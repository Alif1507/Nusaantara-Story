import { api } from "./apiToken";


export type RecoItem = {
  id: string | number;
  title: string;
  region: string;
  tags: string;
  summary: string;
  image_url?: string;
  score: number;
  pulau?: string;
  kategori?: string;
  tokoh?: string;
  nilai_moral?: string;
};

export async function getRecommendations(
  query: string,
  top_k = 5,
  filters?: { region?: string; tags?: string[]; kategori?: string; tokoh?: string; nilai_moral?: string }
) {
  const { data } = await api.post("/api/recommendations", { query, top_k, filters });

  // Normalisasi bentuk respons (bisa {results:[...]} atau langsung [...])
  const results: RecoItem[] = Array.isArray((data as any)?.results)
    ? (data as any).results
    : Array.isArray(data)
    ? (data as any)
    : [];

  return results;
}

