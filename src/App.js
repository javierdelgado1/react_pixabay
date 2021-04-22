import React, { useState, useEffect } from "react";

import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";
function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas ] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;
    const consultarApi = async () => {
      const imagenesPorPagina = 30;
      const key = "20961370-422929eeaaffcf30a75b98d7f";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      console.info(resultado);
      guardarImagenes(resultado.hits);
      
      // calcular el total de paginas      
      console.info(resultado)
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina) 
      guardarTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});

    };
    consultarApi();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaActual -1;
    console.log(nuevaPaginaActual)
    if(nuevaPaginaActual ===0) return;

    guardarPaginaActual(nuevaPaginaActual)

  }
  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaActual +1;
    if(nuevaPaginaActual > totalPaginas) return;
    console.log(nuevaPaginaActual)
    guardarPaginaActual(nuevaPaginaActual)

  }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes </p>

        <Formulario guardarBusqueda={guardarBusqueda}></Formulario>
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}></ListadoImagenes>
        {paginaActual === 1? null :( <button type="button" className="btn btn-info " onClick={paginaAnterior}> &laquo; Anterior</button>)}
        {paginaActual === totalPaginas ? null : (
          <button type="button" className="btn btn-info " onClick={paginaSiguiente}> Siguiente &raquo;</button>
        )}

      </div>
    </div>
  );
}

export default App;
