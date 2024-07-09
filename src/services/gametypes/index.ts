import { axiosInstance } from "../api";

export const getGameTypes = async () => {
    const response = await axiosInstance.get('/gametypes');
    return response.data;
};