import api from "./apiClient";
export const callApi = async (method, endpoint, data) => {
  try {
    const response = await api[method](endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
