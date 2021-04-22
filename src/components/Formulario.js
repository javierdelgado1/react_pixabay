import React, {useState} from "react";
import Error from "./Error"
const Formulario = ({guardarBusqueda, loading}) => {
    const [termino, guardarTermino] = useState("")
    const [error, guardarError] = useState(false)
    const buscarImagenes = e =>{
        e.preventDefault();

        if(termino.trim() ===''){
            guardarError(true);
            return;
        }
        guardarBusqueda(termino)
    }
  return (
    <form className="row" onSubmit={ e => buscarImagenes(e)}>
      <div className="form-group col-md-8">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Buscan una imagen, ejemplo fubtol o cafe"
          value={termino}
          onChange={e=> guardarTermino(e.target.value)}
        ></input>
      </div>

      <div className="form-group col-md-4">
        <button
          type="submit"
          className="btn btn-lg btn-danger btn-block"
          disabled={termino ===''}
        >
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Cargando</span>}
          {!loading && <span>Buscar</span>}             
        </button>
      </div>

      {error? <Error mensaje="Agrega un termino de busqueda"></Error> : null}
    </form>
  );
};

export default Formulario;
