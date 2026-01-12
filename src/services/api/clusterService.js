import apiClient from "./httpClient";

export const getClusters = async () => {
  const response = await apiClient.get("get-clusters");
  return response.data;
};
