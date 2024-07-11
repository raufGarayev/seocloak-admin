import { axiosInstance } from "../api";

export const getContents = async () => {
    try {
        const response = await axiosInstance.get("/contents");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getContent = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/contents/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createContent = async (content: any) => {
    try {
        const response = await axiosInstance.post("/contents", content);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateContent = async (content: any) => {
    try {
        const response = await axiosInstance.patch(`/contents/${content.id}`, content);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteContent = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/contents/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}