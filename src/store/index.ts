import { configureStore } from '@reduxjs/toolkit';
import { gametypesSlice } from './slices/gametypeSlices';


const store = configureStore({
    reducer: {
        gametypes: gametypesSlice.reducer,
    },
});

export default store;

export type IRootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;