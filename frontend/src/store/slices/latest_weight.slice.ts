import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type WieghtState = {
    latest_weight: number | null
};

const defaultState: WieghtState = {
    latest_weight: null
};

export const latestWeightSlice = createSlice({
    name: 'latest_weight',
    initialState: defaultState,
    reducers: {
        setLatestWeight: (state, action: PayloadAction<number | null >) => {
            state.latest_weight = action.payload;
        },
        resetLatestweight: (state) => {
            state.latest_weight = null;
        },
    }
});

//? Action creators are generated for each case reducer function
export const { 
    setLatestWeight,
    resetLatestweight
} = latestWeightSlice.actions;
export default latestWeightSlice.reducer;
