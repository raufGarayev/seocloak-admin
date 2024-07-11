import { createSlice } from "@reduxjs/toolkit";


const initialModalState = {
    isOpen: false,
    type: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        toggleModal(state, action) {
            state.isOpen = !state.isOpen;
            state.type = action.payload;
        }
    }
});

export const {
    toggleModal
} = modalSlice.actions;