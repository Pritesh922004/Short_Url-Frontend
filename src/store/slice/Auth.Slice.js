import { createSlice } from "@reduxjs/toolkit";

// const initialState = {

// }

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const { login, logout } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;