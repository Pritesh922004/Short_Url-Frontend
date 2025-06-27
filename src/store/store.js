import { configureStore } from '@reduxjs/toolkit';
import  {AuthReducer} from './slice/Auth.Slice';
import { UrlsReducer } from './slice/Url.slice';


export const store = configureStore({
    reducer: {
        Auth:AuthReducer,
        Urls:UrlsReducer,
    }
});

export default store;