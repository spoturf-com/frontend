import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slice/bookingSlice.js";
import filterReducer from "./slice/filterSlice.js"

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    filter: filterReducer
  },
});

export default store;
