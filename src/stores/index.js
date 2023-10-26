import { configureStore } from "@reduxjs/toolkit";
import { clipSlice } from "./clip";
import { localModelSlice } from "./localMode";

export const store = configureStore({
  reducer: {
    clip: clipSlice.reducer,
    localModel: localModelSlice.reducer,
  },
});
