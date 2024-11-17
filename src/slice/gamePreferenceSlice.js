// gamePreferenceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const gamePreferenceSlice = createSlice({
  name: "gamePreference",
  initialState: [], // Ensure initial state is an empty array
  reducers: {
    toggleGamePreference: (state, action) => {
      const game = action.payload;
      if (state.includes(game)) {
        return state.filter((g) => g !== game);
      } else {
        return [...state, game];
      }
    },
  },
});

export const { toggleGamePreference } = gamePreferenceSlice.actions;
export default gamePreferenceSlice.reducer;
