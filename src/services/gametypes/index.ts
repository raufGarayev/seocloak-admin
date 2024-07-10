import { axiosInstance } from "../api";

export const fetchGameTypes = async () => {
    const response = await axiosInstance.get('/gametypes');
    return response.data;
};

export const getGameType = async (id: number) => {
    const response = await axiosInstance.get(`/gametypes/${id}`);
    return response.data;
};

export const createGameType = async (data: any) => {
    const response = await axiosInstance.post('/gametypes', data);
    return response.data;
};

export const updateGameType = async (id: number, data: any) => {
    const response = await axiosInstance.put(`/gametypes/${id}`, data);
    return response.data;
};

export const deleteGameType = async (id: number) => {
    const response = await axiosInstance.delete(`/gametypes/${id}`);
    return response.data;
};