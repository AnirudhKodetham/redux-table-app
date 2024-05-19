import { createSlice } from '@reduxjs/toolkit';

const rowsSlice = createSlice({
    name: 'rows',
    initialState: [],
    reducers: {
        addRow: (state, action) => {
            state.push(action.payload);
        },
        updateRow: (state, action) => {
            state[action.payload.index] = action.payload.row;
        },
        deleteRow: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        }
    }
});

export const { addRow, updateRow, deleteRow } = rowsSlice.actions;

export default rowsSlice.reducer;
