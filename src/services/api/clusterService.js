import apiClient from "./httpClient";

export const getClusters = async () => {
  const response = await apiClient.get("cluster/list");
  return response.data;
};
