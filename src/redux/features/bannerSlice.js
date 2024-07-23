import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBanner = createAsyncThunk("banner/getBanner", async () => {
  try {
    const res = await axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
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
});

const initialState = {
  banner: [],
  loading: false,
  error: null,
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bannerSlice.reducer;
