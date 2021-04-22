import React, {useState} from "react";
import Error from "./Error"
const Formulario = ({guardarBusqueda}) => {
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
          placeholder="Buscan una imagen, ejemeplo fubtol o cafe"
          value={termino}
          onChange={e=> guardarTermino(e.target.value)}
        ></input>
      </div>

      <div className="form-group col-md-4">
        <input
          type="submit"
          className="btn btn-lg btn-danger btn-block"
          value="Buscar"
        ></input>
      </div>

      {error? <Error mensaje="Agrega un termino de busqueda"></Error> : null}
    </form>
  );
};

export default Formulario;
