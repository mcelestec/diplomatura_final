import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RecetaItem from '../../components/recetas/RecetaItem';

const RecetasDulcesPage = (props) => { 

    const[loading, setLoading] = useState(false);
    const[recetas, setRecetas] = useState([]);

    useEffect(() => {
        const cargarRecetasDulces = async() => {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/recetasDulces'); 
            setRecetas(response.data);
            setLoading(false);
        };

        cargarRecetasDulces();
    }, []);

    return (
        <main className="main-recetas">
            <h2>Recetas dulces</h2>
            {
                loading? (
                    <p>Cargando...</p>
                ) : (
                    recetas.map(item => <RecetaItem key={item.id} titulo={item.titulo} ingredientes={item.ingredientes}
                    instrucciones={item.instrucciones} imagen_url={item.imagen_url}/>)
                )
            }
        </main>
    )

}

export default RecetasDulcesPage;