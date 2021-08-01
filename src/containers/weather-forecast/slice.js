import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./constant";

const initialState = {
  weathers: [],
  loading: false
};

export const weatherForeCastSlice = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {
    fetchDataStart: state => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.weathers = action.payload;
      state.loading = false;
    },
    fetchDataFailed: state => {
      state.weathers = [];
      state.loading = false;
    }
  }
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailed
} = weatherForeCastSlice.actions;

export default weatherForeCastSlice.reducer;