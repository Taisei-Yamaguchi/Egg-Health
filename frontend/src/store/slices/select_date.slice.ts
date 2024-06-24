import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type DateState = {
    date: string | null
};

const defaultState: DateState = {
    date:null
};

export const dateSlice = createSlice({
    name: 'food_meal',
    initialState: defaultState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        resetDate: (state) => {
            state.date = null;
        },
    }
});

//? Action creators are generated for each case reducer function
export const { setDate, resetDate } = dateSlice.actions;
export default dateSlice.reducer;
