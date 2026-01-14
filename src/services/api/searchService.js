import apiClient from "./httpClient";

export const searchNewsByTitle = async (query) => {
  const response = await apiClient.get("news/search-title", {
    params: { query },
  });
  return response.data;
};
