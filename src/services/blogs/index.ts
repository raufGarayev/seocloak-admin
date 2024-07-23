import { axiosInstance } from "../api";

export const getBlogs = async () => {
    try {
        const response = await axiosInstance.get("/blogs");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBlog = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createBlog = async (blog: any) => {
    try {
        const response = await axiosInstance.post("/blogs", blog);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateBlog = async (blog: any) => {
    try {
        const response = await axiosInstance.patch(`/blogs/${blog.id}`, blog);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteBlog = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}