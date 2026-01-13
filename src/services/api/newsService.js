import apiClient from "./httpClient";

export const getNewsList = async () => {
  const response = await apiClient.get("news/");
  return response.data;
};

export const getTopNews = async (limit = 1) => {
  const response = await apiClient.get("news/top", {
    params: { limit },
  });
  return response.data;
};

export const getNewsDetail = async (titleIndex) => {
  const response = await apiClient.get("news/detail", {
    params: { titleIndex: titleIndex },
  });
  return response.data;
};

export const getNewsByCluster = async (clusterIndex) => {
const response = await apiClient.get("news/cluster", {
  params: { cluster: clusterIndex },
});
  return response.data;
};
