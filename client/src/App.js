import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { localStorageCart } from "./redux/slices/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cart from "./pages/Cart/Cart";
import NavBar from "./components/NavBar/NavBar";
import Detalles from "./pages/Detalles/Detalles";
import AddArticle from "./pages/AddArticle/AddArticle";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(localStorageCart(JSON.parse(window.localStorage.getItem("cart"))));
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detalles/:id" element={<Detalles />} />
        <Route path="/addItem" element={<AddArticle />} />
        <Route path="/successBuy" element={<AddArticle />} />
        <Route path="/addItem" element={<AddArticle />} />
      </Routes>
    </div>
  );
}

export default App;
