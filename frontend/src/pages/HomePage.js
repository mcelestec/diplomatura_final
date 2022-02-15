import React from 'react'
import '../styles/components/pages/HomePage.css'

const HomePage = (props) => { 
    return (
        <main className="main-home">
            <div className="recetario-container">
                <h2>Lleva las recetas con vos</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero rerum in mollitia nemo, facere nulla nam
                    magnam labore voluptatem. Eligendi animi fugit possimus voluptatum ab sint aspernatur nihil perferendis
                    nisi?</p>
                <button className="button-large">Solicita recetario gratis</button>
            </div>
            <div className="home-img-container">
                <img className="home-img" src="img/home/home3.png" alt="Imagen de fondo" />
            </div>
        </main>
    );
}

export default HomePage;