import { createSlice } from '@reduxjs/toolkit'
import { IContentState } from '../../../types/contents'

const initialContentState = {
  contents: [],
  loading: false,
  selectedContent: null
}

export const contentSlice = createSlice({
  name: 'contents',
  initialState: initialContentState as IContentState,
  reducers: {
    sendRequestStart (state) {
      state.loading = true
    },
    sendRequestFailure (state) {
      state.loading = false
    },
    getContentsSuccess: (state, action) => {
      state.contents = action.payload
      state.loading = false
    },
    createContentSuccess: (state, action) => {
      state.contents.push(action.payload)
      state.loading = false
    },

    updateContentSuccess: (state, action) => {
      state.contents = state.contents.map(content => {
        return content.id === action.payload.id ? action.payload : content
      })
      state.loading = false
    },

    deleteContentSuccess: (state, action) => {
      state.contents = state.contents.filter(
        content => content.id !== action.payload
      )
      state.loading = false
    },

    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload
    }
  }
})

export const {
  sendRequestStart,
  sendRequestFailure,
  getContentsSuccess,
  createContentSuccess,
  updateContentSuccess,
  deleteContentSuccess,
  setSelectedContent
} = contentSlice.actions
