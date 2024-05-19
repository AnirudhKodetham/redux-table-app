import { configureStore } from '@reduxjs/toolkit';
import rowsReducer from './rowsSlice';

const store = configureStore({
    reducer: {
        rows: rowsReducer
    }
});

export default store;
