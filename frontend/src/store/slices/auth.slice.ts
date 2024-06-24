import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Account } from '@/interfaces/account.interface';

export type AuthState = {
    account: Account | null;
};

const defaultState: AuthState = {
    account: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: defaultState,
    reducers: {
    setAuth: (state, action: PayloadAction<Account>) => {
        state.account = {
            id: action.payload.id,
            nickname: action.payload.nickname,
            username: action.payload.username,
        };
    },
    resetAuth: (state) => {
        state.account = null;
    },
    }
});

//? Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
