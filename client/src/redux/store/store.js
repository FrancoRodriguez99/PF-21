import { configureStore } from "@reduxjs/toolkit";
import articles from "../slices/articlesSlice";
import cart from "../slices/cartSlice";
import details from "../slices/detailSlice";

export default configureStore({
  reducer: {
    articles,
    cart,
    details,
  },
});
