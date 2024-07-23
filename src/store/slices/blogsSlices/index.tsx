import { createSlice } from '@reduxjs/toolkit'
import { IBlogsState } from '../../../types/blogs'

const initialState = {
  blogs: [],
  loading: false,
  selectedBlog: null
}

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: initialState as IBlogsState,
  reducers: {
    sendRequestStart (state) {
      state.loading = true
    },
    sendRequestFailure (state) {
      state.loading = false
    },
    getBlogsSuccess: (state, action) => {
      state.blogs = action.payload
      state.loading = false
    },
    createBlogSuccess: (state, action) => {
      state.blogs.push(action.payload)
      state.loading = false
    },
    updateBlogSuccess: (state, action) => {
      state.blogs = state.blogs.map(blog => {
        return blog.id === action.payload.id ? action.payload : blog
      })
      state.loading = false
    },
    deleteBlogSuccess: (state, action) => {
      state.blogs = state.blogs.filter(
        blog => blog.id !== action.payload
      )
      state.loading = false
    },
    setSelectedBlog: (state, action) => {
        state.selectedBlog = action.payload
        }
  }
})

export const {
  sendRequestStart,
  sendRequestFailure,
  getBlogsSuccess,
  createBlogSuccess,
  updateBlogSuccess,
  deleteBlogSuccess,
  setSelectedBlog
} = blogsSlice.actions
