import { createSlice } from "@reduxjs/toolkit";

// const initialState = {

// }

export const UrlSlice = createSlice({
    name: 'urls',
    initialState: {
        urls: null,
    },
    reducers: {
        fetchUrls: (state, action) => {
            state.urls = action.payload;
        }
    }
})

export const { fetchUrls } = UrlSlice.actions;
export const UrlsReducer = UrlSlice.reducer;