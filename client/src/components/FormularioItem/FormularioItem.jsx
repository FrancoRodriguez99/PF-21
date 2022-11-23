import { useEffect, useState } from "react";
import { uploadPhotoToCloudinary } from "../../hooks/uploadToCloudinary";

export default function FormularioItem({ data }) {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/category/getall", { method: "GET" })
      .then((dataJson) => dataJson.json())
      .then((data) => {
        setCategorias(data);
      });
  }, []);
  const values = {
    title: data.title || "",
    precio: data.price || "",
    images: data.images || [],
    category: { new: false, title: "new", photo: "", id: data.categoryId },
    description: data.description || "",
    loading: false,
    updated: false,
  };

  const [item, setItem] = useState(values);

  function handleTitle(e) {
    setItem({ ...item, title: e.target.value });
  }
  function handlePrecio(e) {
    setItem({ ...item, precio: e.target.value });
  }
  async function handleImage(e) {
    setItem({ ...item, loading: true });
    const response = uploadPhotoToCloudinary(e);
    const d = await response();
    setItem({ ...item, images: item.images.concat(d), loading: false });
  }
  function descripcion(e) {
    setItem({ ...item, description: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/articulo/createItem", { method: "POST", body: JSON.stringify(item), headers: new Headers({ "content-type": "application/json" }) })
      .then((dataJson) => dataJson.json())
      .then((data) => {
        console.log(data);
        setItem({ ...item, updated: true });
      });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input placeholder="Titulo" value={item.title} onChange={(e) => handleTitle(e)} type="text"></input>
      <input placeholder="Precio" onChange={(e) => handlePrecio(e)} type="number" step="0.01"></input>
      <textarea onChange={(e) => descripcion(e)} value={item.description}></textarea>
      <input name="formulario_uploadPhoto" multiple="multiple" type="file" accept="image/png,image/jpeg" onChange={(e) => handleImage(e)}></input>

      {item.category.new ? (
        "deberia poner para crear una nueva categoria aca"
      ) : (
        <select onChange={(e) => setItem({ ...item, category: { new: false, id: e.target.value } })}>
          {categorias.map((x) => (
            <option key={x.id + x.name} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      )}

      {item.images.length > 0
        ? item.images.map((x) => (
            <div key={x}>
              <img src={x} alt="articulo"></img>{" "}
              <button type="button" onClick={() => setItem({ ...item, images: item.images.slice(0, item.images.indexOf(x)).concat(item.images.slice(item.images.indexOf(x) + 1, item.images.length)) })}>
                X
              </button>
            </div>
          ))
        : item.loading
        ? "Cargando"
        : null}

      <button type="submit">Actualizar/Crear Producto</button>
    </form>
  );
}
