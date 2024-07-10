import { createSlice } from '@reduxjs/toolkit';
import { IGametypeState } from '../../../types/gametypes';

const initialGametypeState = {
    gametypes: [],
    loading: false,
};

export const gametypesSlice = createSlice({
    name: 'gametypes',
    initialState: initialGametypeState as IGametypeState,
    reducers: {
        sendRequestStart(state) {
            state.loading = true;
        },
        fetchGametypesSuccess(state, action) {
            state.loading = false;
            state.gametypes = action.payload;
        },
        sendRequestFailure(state) {
            state.loading = false;
        },
        createGametypeSuccess(state, action) {
            state.loading = false;
            state.gametypes.push(action.payload);
        },
        updateGametypeSuccess(state, action) {
            state.loading = false;
            const index = state.gametypes.findIndex(cert => cert.id === action.payload.id);
            state.gametypes[index] = action.payload;
        },
        deleteGametypeteSuccess(state, action) {
            state.loading = false;
            state.gametypes = state.gametypes.filter(gmtp => gmtp.id !== action.payload);
        }
    }
});

export const {
    sendRequestStart,
    sendRequestFailure,
    fetchGametypesSuccess,
    createGametypeSuccess,
    updateGametypeSuccess,
    deleteGametypeteSuccess
} = gametypesSlice.actions;