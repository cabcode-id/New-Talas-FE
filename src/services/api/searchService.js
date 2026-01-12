import apiClient from "./httpClient";

export const searchNewsByTitle = async (query) => {
  const response = await apiClient.get("search-title", {
    params: { query },
  });
  return response.data;
};
