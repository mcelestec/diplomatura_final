import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/pages/RecetasPage.css'

const RecetasPage = (props) => { 
    return (
        <main className="main-recetas">
            <h2>Recetas</h2>

            <div className="recetas">
                <div className="receta">
                    <img src="img/recetas/dulces.jpg" alt="Recetas dulces" />

                    <div className="tab-receta">
                        <Link to="/recetas/recetasDulces">
                            <p>Dulces</p>
                        </Link>
                    </div>
                </div>
                <div className="receta">
                    <img src="img/recetas/saladas.jpg" alt="Recetas saladas" />

                    <div className="tab-receta">
                        <Link to="/recetas/recetasSaladas">
                            <p>Saladas</p>
                        </Link>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default RecetasPage;