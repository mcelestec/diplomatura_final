import { Link } from 'react-router-dom'

const RecetaItem = (props) => {
    const {titulo, ingredientes, instrucciones, imagen_url} = props;

    return (
        <div className="item-receta">
        {
        (imagen_url !== '')?
            (
                <img src={imagen_url} alt="Imagen de {titulo}" />
            )
        :
            (   
                <div className="div-img" >Imagen de {titulo}</div>
            )
        }

        <div className="tab-item-receta">
            <h3>{titulo}</h3>
            <h4>Ingredientes</h4>
            <ul>
                {
                    ingredientes.map(ingrediente =>
                        <li key={ingrediente.id}>{ingrediente.descripcion}</li>
                    )
                }
            </ul>
            <h4>Instrucciones</h4>
            <ol>
                {
                    instrucciones.map(instruccion =>
                        <li key={instruccion.id}>{instruccion.descripcion}</li>
                    )
                }
            </ol>
            <Link className="boton-volver" to="/recetas">Volver a Recetas</Link>
        </div>
    </div>
    )
}

export default RecetaItem;