import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../../redux/slices/cartSlice";
import Article from "../../components/Article/Article";
import { useMercadopago } from "react-sdk-mercadopago";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Cart() {
  const carro = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const mercadopago = useMercadopago.v2("TEST-4d76826e-3115-416c-bc70-f7a46fa75820", {
    locale: "es-AR",
  });

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (carro.length > 0 && !isLoading && isAuthenticated) {
      fetch("http://localhost:3001/mercadoPago/createOrder", { method: "POST", body: JSON.stringify({ carro, user: user }), headers: new Headers({ "content-type": "application/json" }) })
        .then((dataJson) => dataJson.json())
        .then((data) => {
          if (mercadopago) {
            mercadopago.checkout({
              preference: {
                id: data.id,
              },
              render: {
                container: ".cho-container",
                label: "Comprar",
              },
            });
          }
        });
    }
  }, [mercadopago, carro, user, isAuthenticated, isLoading]);

  return (
    <div>
      <button onClick={() => dispatch(cleanCart())}>Vaciar Carro</button>
      <div className="cho-container" />
      {carro.map((x) => (
        <Article data={x} key={x.title + x.id} />
      ))}
    </div>
  );
}
