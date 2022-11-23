import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allArticles: [],
  filterArticles: [],
  categorias: [],
  loading: true,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    getAllData: (state, { payload }) => {
      state.allArticles = payload.articulos;
      state.filterArticles = payload.articulos;
      state.categorias = payload.categorias;
      state.loading = false;
    },
    getDataForFiltering: (state, { payload }) => {
      var newArray = [...state.allArticles];

      if (payload.priceRange.min !== "") newArray = newArray.filter((x) => x.price > parseInt(payload.priceRange.min));
      if (payload.priceRange.max !== "") newArray = newArray.filter((x) => x.price < parseInt(payload.priceRange.max));
      if (payload.title) newArray = newArray.filter((x) => x.title.toLowerCase().includes(payload.title.toLowerCase()));
      if (payload.order === "+Precio-") newArray = newArray.sort((a, b) => b.price - a.price);
      if (payload.order === "-Precio+") newArray = newArray.sort((a, b) => a.price - b.price);
      if (payload.categoria.length > 0) newArray = newArray.filter((x) => payload.categoria.map((x) => x.value).indexOf(x.categoryId) >= 0);

      state.filterArticles = [...newArray];
    },
  },
});

export const { getAllData, getDataForFiltering } = articlesSlice.actions;
export default articlesSlice.reducer;
