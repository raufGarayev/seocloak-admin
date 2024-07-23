import { createBlogSuccess, deleteBlogSuccess, getBlogsSuccess, sendRequestFailure, sendRequestStart, setSelectedBlog, updateBlogSuccess } from ".."
import { createBlog, getBlog, getBlogs, updateBlog } from "../../../../services/blogs"


export const fetchBlogsAction = () => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const blogs = await getBlogs()
        dispatch(getBlogsSuccess(blogs))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const fetchBlogAction = (id: number) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const blog = await getBlog(id)
        dispatch(setSelectedBlog(blog))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const createBlogAction = (blog: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const newBlog = await createBlog(blog)
        dispatch(createBlogSuccess(newBlog))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const updateBlogAction = (blog: any) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        const updatedBlog = await updateBlog(blog)
        dispatch(updateBlogSuccess(updatedBlog))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}

export const deleteBlogAction = (id: number) => async (dispatch: any) => {
    try {
        dispatch(sendRequestStart())
        await createBlog(id)
        dispatch(deleteBlogSuccess(id))
    } catch (error) {
        dispatch(sendRequestFailure())
    }
}