import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type LicenseState = {
    license: "free" | "premium" | "premium_plus" | null
};

const defaultState: LicenseState = {
    license: null,
};

export const licenseSlice = createSlice({
    name: 'license',
    initialState: defaultState,
    reducers: {
    setLicense: (state, action: PayloadAction<"free" | "premium" | "premium_plus">) => {
        state.license = action.payload
    },
    resetLicense: (state) => {
        state.license = null;
    },
    }
});

//? Action creators are generated for each case reducer function
export const { setLicense, resetLicense } = licenseSlice.actions;

export default licenseSlice.reducer;
