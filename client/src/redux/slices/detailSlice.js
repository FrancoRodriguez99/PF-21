import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailedArticle: {
    images: [],
    category: { name: "" },
  },
};

const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    insertDataDetails: (state, { payload }) => {
      state.detailedArticle = payload;
    },
    cleanDetails: (state) => {
      state = initialState;
    },
  },
});

export const { insertDataDetails, cleanDetails } = detailSlice.actions;
export default detailSlice.reducer;
