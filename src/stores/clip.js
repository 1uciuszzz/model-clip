import { createSlice } from "@reduxjs/toolkit";

export const clipSlice = createSlice({
  name: "clip",
  initialState: {
    cliped: false,
    w: 0,
    h: 0,
    d: 0,
    x: 0,
    y: 0,
    z: 0,
    cx: 0,
    cy: 0,
    cz: 0,
    rx: 0,
    ry: 0,
    rz: 0,
  },
  reducers: {
    setWHD: (state, action) => {
      state.w = action.payload.w;
      state.h = action.payload.h;
      state.d = action.payload.d;
    },
    setXYZ: (state, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.z = action.payload.z;
    },
    setCliped: (state, action) => {
      state.cliped = action.payload;
    },
    setCXYZ: (state, action) => {
      state.cx = action.payload.x;
      state.cy = action.payload.y;
      state.cz = action.payload.z;
    },
    setRXYZ: (state, action) => {
      state.rx = action.payload.x;
      state.ry = action.payload.y;
      state.rz = action.payload.z;
    },
  },
});
