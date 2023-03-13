import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {todoApi} from "./todos.api";

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApi.middleware)
})

