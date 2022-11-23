import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { insertDataDetails, cleanDetails } from "../../redux/slices/detailSlice";

export default function Detalles() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.details.detailedArticle);

  useEffect(() => {
    fetch("http://localhost:3001/articulo/" + id, { method: "GET" })
      .then((dataJson) => dataJson.json())
      .then((data) => {
        dispatch(insertDataDetails(data));
      });
    return () => dispatch(cleanDetails());
  }, [id, dispatch]);

  return (
    <div>
      <h1>{details.title}</h1>
      <p>{details.description}</p>
      <h2>{details.price}</h2>
      <h3>{details.category.name}</h3>
      {details.images.map((x) => (
        <img src={x} alt="product" key={x}></img>
      ))}
    </div>
  );
}
