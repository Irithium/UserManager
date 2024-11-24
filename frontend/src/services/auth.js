import api from "./api";

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
