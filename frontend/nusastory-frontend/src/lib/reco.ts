import { api } from "./apiToken";

export type RecoItem = {
  id: string | number;
  title: string;
  region: string;
  tags: string;
  summary: string;
  image_url?: string;
  score: number;
  // opsional: pulau/kategori/tokoh/nilai_moral kalau engine mengirimkan
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
  const { data } = await api.post<{ results: RecoItem[] }>("/api/recommendations", {
    query,
    top_k,
    filters,
  });
  return data.results;
}
