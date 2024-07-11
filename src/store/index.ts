import { configureStore } from '@reduxjs/toolkit';
import { gametypesSlice } from './slices/gametypeSlices';
import { highlightsSlice } from './slices/highlightsSlices';
import { modalSlice } from './slices/modalSlices';
import { contentSlice } from './slices/contentsSlices';


const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        gametypes: gametypesSlice.reducer,
        highlights: highlightsSlice.reducer,
        contents: contentSlice.reducer
    },
});

export default store;

export type IRootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;