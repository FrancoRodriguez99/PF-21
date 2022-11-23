import "./Article.css";
import { addItemToCart, cleanItem, changeQuantity } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Article({ data }) {
  const carro = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="article_individual_item">
      <Link to={"/detalles/" + data.id} className="article_title">
        {data.title}
      </Link>
      <img src={data.images[0]} className="article_image" alt="articulo"></img>
      <h2 className="article_price">{data.price}$</h2>
      {carro.filter((x) => x.id === data.id).length > 0 ? <button onClick={() => dispatch(cleanItem(data.id))}>Remover del Carro</button> : <button onClick={() => dispatch(addItemToCart(data))}>Agregar Al Carro</button>}
      {carro.filter((x) => x.id === data.id).length > 0 ? <input type="number" value={carro.filter((x) => x.id === data.id)[0].quantity} onChange={(e) => dispatch(changeQuantity({ id: data.id, quantity: e.target.value }))}></input> : null}
    </div>
  );
}
