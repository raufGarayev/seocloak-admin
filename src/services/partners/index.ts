import { axiosInstance } from "../api";

export const getPartners = async (params?: any) => {
  try {
    const response = await axiosInstance.get("/partners", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};