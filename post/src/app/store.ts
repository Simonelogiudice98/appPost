import { configureStore } from "@reduxjs/toolkit";
import PostReducer from './features/postSlice'


export const store = configureStore({
    reducer:{
        post:PostReducer
    }
}) 

export type RootState = ReturnType<typeof store.getState>;