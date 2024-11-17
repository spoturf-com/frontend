import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  selectedTimeSlots: [],
  selectedDate: "",
  bookingDetails: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },
    toggleGamePreference: (state, action) => {
      const game = action.payload;
      if (state.games.includes(game)) {
        state.games = state.games.filter((g) => g !== game);
      } else {
        state.games.push(game);
      }
    },
    toggleTimeSlot: (state, action) => {
      const slot = action.payload;
      if (state.selectedTimeSlots.includes(slot)) {
        state.selectedTimeSlots = state.selectedTimeSlots.filter(
          (s) => s !== slot
        );
      } else {
        state.selectedTimeSlots.push(slot);
      }
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    clearBookings: (state) => {
      state.bookingDetails = [];
    },
  },
});

export const {
  toggleGamePreference,
  toggleTimeSlot,
  setSelectedDate,
  clearBookings,
  setBookingDetails,
} = bookingSlice.actions;
export default bookingSlice.reducer;
