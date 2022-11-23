import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../redux/slices/articlesSlice";
import Article from "../Article/Article";
import "./Articles.css";

export default function Articles() {
  const dispatch = useDispatch();
  const articulos = useSelector((state) => state.articles);
  const [pagina, setPagina] = useState(1);
  const [specificOne, setspecificOne] = useState(1);

  console.log(articulos);

  useEffect(() => {
    fetch("http://localhost:3001/articulo/getall", { method: "GET" })
      .then((dataJson) => dataJson.json())
      .then((data) => {
        dispatch(getAllData(data));
      });
  }, [dispatch]);

  useEffect(() => {
    if (Math.ceil(articulos.filterArticles.length / 8) < pagina) setPagina(1);
  }, [articulos, pagina]);

  function handlePagina(e) {
    if (e.target.value >= 1 && e.target.value <= Math.ceil(articulos.filterArticles.length / 8)) setspecificOne(e.target.value);
  }

  return (
    <div>
      Pagina {pagina}
      <div id="main_display_articles">
        {articulos.filterArticles?.map((x, i) => (i < 8 * pagina && i > 8 * pagina - 9 ? <Article data={x} key={x.id} /> : null))}
        {articulos.loading ? <div>Cargando....</div> : articulos.filterArticles?.length === 0 ? "No hay coinsidencias" : null}
      </div>
      <div id="articles_paginado_container">
        <button onClick={() => (pagina === 1 ? setPagina(Math.ceil(articulos.filterArticles.length / 8)) : setPagina(pagina - 1))}>Anterior</button>
        <div id="specific_pagina_paginado">
          <button onClick={() => setPagina(specificOne)}>Ir a: pag. </button>
          <input type="number" placeholder={"1-" + Math.ceil(articulos.filterArticles.length / 8)} onChange={(e) => handlePagina(e)}></input>
        </div>
        <button onClick={() => (pagina === Math.ceil(articulos.filterArticles.length / 8) ? setPagina(1) : setPagina(pagina + 1))}>Siguiente</button>
      </div>
    </div>
  );
}
