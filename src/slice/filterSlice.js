import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  selectedTimeSlots: [],
  selectedDate: "",
  rating: 1,
  priceRange: 100,
  teamMembers: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
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
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.games = [];
      state.selectedTimeSlots = [];
      state.selectedDate = "";
      state.rating = 1;
      state.priceRange = 100;
      state.teamMembers = 1;
    },
    setTeamMembers: (state, action) => {
      state.teamMembers = action.payload;
    },
  },
});

export const {
  toggleGamePreference,
  toggleTimeSlot,
  setSelectedDate,
  setRating,
  setPriceRange,
  resetFilters,
  setTeamMembers,
} = filterSlice.actions;
export default filterSlice.reducer;
