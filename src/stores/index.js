import { configureStore } from "@reduxjs/toolkit";
import { clipSlice } from "./clip";

export const store = configureStore({
  reducer: {
    clip: clipSlice.reducer,
  },
});
