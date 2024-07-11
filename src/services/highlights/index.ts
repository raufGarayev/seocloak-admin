import { axiosInstance } from "../api";

export const fetchHighlights = async () => {
  try {
    const response = await axiosInstance.get("/highlights");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createHighlight = async (highlight: any) => {
  try {
    const response = await axiosInstance.post("/highlights", highlight);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateHighlight = async (highlight: any) => {
  try {
    const response = await axiosInstance.patch(`/highlights/${highlight.id}`, highlight);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHighlight = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/highlights/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};