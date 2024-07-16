import { createSlice } from '@reduxjs/toolkit'

const initialModalState = {
  isOpen: false,
  type: '',
  hint: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    toggleModal (state, action) {
      if (action.payload === null) {
        state.isOpen = false
        state.type = ''
        state.hint = ''
      } else {
        state.isOpen = action.payload.isOpen || !state.isOpen
        state.type = action.payload.type
        if (action.payload.hint) {
          state.hint = action.payload.hint
        }
      }
    }
  }
})

export const { toggleModal } = modalSlice.actions
