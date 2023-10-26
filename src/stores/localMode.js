import { createSlice } from "@reduxjs/toolkit";

export const localModelSlice = createSlice({
  name: "localModel",
  initialState: {
    models: [],
  },
  reducers: {
    apendModel: (state, action) => {
      state.models.push({
        fileName: action.payload.fileName,
        url: action.payload.url,
      });
    },
    setModelMeshes: (state, action) => {
      const target = state.models.find(
        (model) => model.url === action.payload.url
      );
      target.meshes = action.payload.mehes;
    },
  },
});
