import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./features/bannerSlice";
import categoryReducer from "./features/categorySlice";
import activityReducer from "./features/activitySlice";
import promoReducer from "./features/promoSlice";

const store = configureStore({
  reducer: {
    bannerReducer,
    categoryReducer,
    activityReducer,
    promoReducer,
  },
});

export default store;
