import { createSlice } from '@reduxjs/toolkit';
import { IHighlightState } from '../../../types/highlights';

const initialHighlightsState = {
    highlights: [],
    loading: false,
    selectedHighlight: null
};

export const highlightsSlice = createSlice({
    name: 'highlights',
    initialState: initialHighlightsState as IHighlightState,
    reducers: {
        sendRequestStart(state) {
            state.loading = true;
        },
        fetchHighlightsSuccess(state, action) {
            state.loading = false;
            state.highlights = action.payload;
        },
        sendRequestFailure(state) {
            state.loading = false;
        },
        createHighlightSuccess(state, action) {
            state.loading = false;
            state.highlights.push(action.payload);
        },
        updateHighlightSuccess(state, action) {
            state.loading = false;
            const index = state.highlights.findIndex(hghlght => hghlght.id === action.payload.id);
            state.highlights[index] = action.payload;
        },
        deleteHighlightSuccess(state, action) {
            state.loading = false;
            state.highlights = state.highlights.filter(hl => hl.id !== action.payload);
        },
        setSelectedHighlight(state, action) {
            state.selectedHighlight = action.payload;
        }
    }
});

export const {
    sendRequestStart,
    sendRequestFailure,
    fetchHighlightsSuccess,
    createHighlightSuccess,
    updateHighlightSuccess,
    deleteHighlightSuccess,
    setSelectedHighlight
} = highlightsSlice.actions;
