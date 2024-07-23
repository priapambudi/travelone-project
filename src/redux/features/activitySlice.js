import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getActivity = createAsyncThunk(
  "activity/getActivity",
  async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      return res.data.data;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  activity: [],
  loading: false,
  error: null,
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activity = action.payload;
      })
      .addCase(getActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default activitySlice.reducer;
