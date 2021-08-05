import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./constant";

const initialState = {
  locations: [],
  weather: {},
  loading: false,
  loadingWeather: false
};

export const weatherForeCastSlice = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {
    // Locations
    fetchDataStart: state => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.locations = action.payload;
      state.loading = false;
    },
    fetchDataFailed: state => {
      state.locations = [];
      state.loading = false;
    },

    // Weather
    fetchWeatherStart: state => {
      state.loadingWeather = true;
    },
    fetchWeatherSuccess: (state, action) => {
      state.weather[action.payload.woeid] = action.payload;
      state.loadingWeather = false;
    },
    fetchWeatherFailed: state => {
      state.loadingWeather = false;
    }
  }
});

export const {
  // Locations
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailed,

  // Weather
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailed
} = weatherForeCastSlice.actions;

export default weatherForeCastSlice.reducer;