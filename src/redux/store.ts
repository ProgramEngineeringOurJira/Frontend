import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./features/columns/columnsSlice";

export const store = configureStore({
    reducer: {
        columns: columnsSlice.reducer,
    }
})