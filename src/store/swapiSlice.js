import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  data: [],
  loading: false,
  error: null,
  url: "https://swapi.dev/api/people/",
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
      state.data = action.payload.results;
      state.url = action.payload.next;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchNext: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearData: (state) => {
      state.data = [];
    },
  },
});
export const { fetchStart, fetchSuccess, fetchFailure, fetchNext, clearData } =
  swapiSlice.actions;

export const fetchSwapiData = () => async (dispatch, getState) => {
  dispatch(fetchStart());

  const { url } = getState().swapi;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    dispatch(fetchSuccess(data));
  } catch (error) {
    console.error("Fetch error:", error);
    dispatch(fetchFailure("Failed to fetch data"));
  }
};

export default swapiSlice.reducer;
