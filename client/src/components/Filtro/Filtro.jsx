import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataForFiltering } from "../../redux/slices/articlesSlice";
import { MultiSelect } from "react-multi-select-component";
import "./Filtro.css";

export default function Filtro() {
  const dispatch = useDispatch();
  const initalState = {
    title: "",
    order: null,
    priceRange: { min: "", max: "" },
    categoria: [],
  };

  const [filter, setFilter] = useState(initalState);
  const categorias = useSelector((state) => state.articles.categorias);

  useEffect(() => {
    dispatch(getDataForFiltering(filter));
  }, [filter, dispatch]);

  function handlePrice(e) {
    switch (e.target.id) {
      case "filter_price_order":
        setFilter({
          ...filter,
          order: filter.order === null ? "+Precio-" : filter.order === "-Precio+" ? null : "-Precio+",
        });
        break;
      case "filter_price_min":
        setFilter({
          ...filter,
          priceRange: {
            ...filter.priceRange,
            min: e.target.value.length > 0 ? e.target.value : "",
          },
        });
        break;
      case "filter_price_max":
        setFilter({
          ...filter,
          priceRange: {
            ...filter.priceRange,
            max: e.target.value.length > 0 ? e.target.value : "",
          },
        });
        break;
      default:
        break;
    }
  }

  function handleCategoria(e) {
    setFilter({ ...filter, categoria: e });
  }

  function handleTitle(e) {
    setFilter({
      ...filter,
      title: e.target.value.length > 0 ? e.target.value : "",
    });
  }

  function handleReset() {
    setFilter(initalState);
  }

  return (
    <div id="filter_container_general">
      <input type="text" onChange={handleTitle} value={filter.title} placeholder="Buscar..."></input>
      <div>
        <input type="number" placeholder="Precio Minimo" id="filter_price_min" onChange={handlePrice} value={filter.priceRange.min}></input>{" "}
        <input type="number" id="filter_price_max" onChange={handlePrice} value={filter.priceRange.max} placeholder="Precio Maximo"></input>
        <button id="filter_price_order" onClick={handlePrice}>
          {filter.order === null ? "Ordenar por Precio" : filter.order === "+Precio-" ? "Ordenar de Mayor a Menor precio" : "Ordenar de Menor a Mayor Precio"}
        </button>
      </div>
      <MultiSelect
        options={categorias.map((x) => {
          return { label: x.name, value: x.id };
        })}
        value={filter.categoria}
        onChange={handleCategoria}
        labelledBy="Select"
      />

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
