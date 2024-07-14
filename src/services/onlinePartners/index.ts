import { axiosInstance } from "../api";

export const fetchOnlinePartners = async (gameTypeId: number) => {
    try {
        const response = await axiosInstance.get(`/online-partners?gametypeId=${gameTypeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getOnlinePartner = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/online-partners/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createOnlinePartner = async (data: any) => {
    try {
        const response = await axiosInstance.post("/online-partners", data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateOnlinePartner = async (id: number, data: any) => {
    try {
        const response = await axiosInstance.patch(`/online-partners/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateOnlinePartnersOrder = async (data: any, gametypeId: number | null) => {
    try {
        const response = await axiosInstance.post(`/online-partners/order?gametypeId=${gametypeId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteOnlinePartner = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/online-partners/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}