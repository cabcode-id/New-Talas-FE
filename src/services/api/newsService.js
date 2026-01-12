import apiClient from "./httpClient";

export const getNewsList = async () => {
  const response = await apiClient.get("get-news");
  return response.data;
};

export const getTopNews = async (limit = 1) => {
  const response = await apiClient.get("top-news", {
    params: { limit },
  });
  return response.data;
};

export const getNewsDetail = async (titleIndex) => {
  const response = await apiClient.get(
    `get-news-detail?title_index=${encodeURIComponent(titleIndex)}`
  );
  return response.data;
};

export const getNewsByCluster = async (clusterIndex) => {
  const response = await apiClient.get(
    `get-cluster-news?cluster=${encodeURIComponent(clusterIndex)}`
  );
  return response.data;
};
