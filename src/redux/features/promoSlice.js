import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPromo = createAsyncThunk("promo/getPromo", async () => {
  try {
    const res = await axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
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
  promo: [],
  loading: false,
  error: null,
};

export const promoSlice = createSlice({
  name: "promo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPromo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPromo.fulfilled, (state, action) => {
        state.loading = false;
        state.promo = action.payload;
      })
      .addCase(getPromo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default promoSlice.reducer;
