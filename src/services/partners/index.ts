import { axiosInstance } from "../api";

export const getPartners = async (params?: any) => {
  try {
    const response = await axiosInstance.get("/partners", { params });
    return response.data;
  } catch (error) {
    throw error
  }
};

export const createPartner = async (data: any) => {
  try {
    const response = await axiosInstance.post("/partners", data);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const updatePartner = async (data: any) => {
  try {
    const response = await axiosInstance.patch(`/partners/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const deletePartner = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/partners/${id}`);
    return response.data;
  } catch (error) {
    throw error
  }
}