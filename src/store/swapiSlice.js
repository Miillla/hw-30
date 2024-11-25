import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const swapiSlice = createSlice({
  name: "swapi",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearData: (state) => {
      state.data = [];
    },
  },
});
export const { fetchStart, fetchSuccess, fetchFailure, clearData } =
  swapiSlice.actions;

export const fetchSwapiData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();
    dispatch(fetchSuccess(data.results));
    console.log(data);
  } catch {
    dispatch(fetchFailure("Не вдалося отримати дані"));
  }
};

export default swapiSlice.reducer;
