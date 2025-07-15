import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./reducer/globalSlice";

export const store = configureStore({
    reducer: {
        global: globalReducer,
    },
});
