import React from 'react'
import '../styles/components/pages/InfoPage.css'

const InfoPage = (props) => { 
    return (
        <main className="main-info">
            <h2>Información</h2>

            <div className="tabs">
                <div className="tab">
                    <input className="checkbox" type="checkbox" id="chdef" />
                    <label className="tab-label" htmlFor="chdef">¿Qué es la enfermedad celíaca?</label>
                    <div className="tab-content">
                        <div className="info-img-container">
                            <img src="img/info/que_es.jpg" alt="Definición de enfermedad celíaca" />
                        </div>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum id, nostrum odio incidunt,
                            similique sapiente quidem, ratione dicta minima at ducimus impedit possimus dolorum illum
                            maiores! Soluta earum porro quo?</p>
                    </div>
                </div>
                <div className="tab">
                    <input className="checkbox" type="checkbox" id="chsintomas" />
                    <label className="tab-label" htmlFor="chsintomas">Síntomas</label>
                    <div className="tab-content">
                        <div className="info-img-container">
                            <img src="img/info/sintomas.jpg" alt="Síntomas de la enfermedad celíaca" />
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero saepe, voluptas laborum aperiam
                            officia voluptatum deserunt ab ipsum rem amet facilis exercitationem libero minima corrupti
                            omnis pariatur asperiores alias expedita.</p>
                    </div>
                </div>
                <div className="tab">
                    <input className="checkbox" type="checkbox" id="chdiagnostico" />
                    <label className="tab-label" htmlFor="chdiagnostico">Diagnóstico</label>
                    <div className="tab-content">
                        <div className="info-img-container">
                            <img src="img/info/diagnostico.jpg" alt="Diagnóstico de la enfermedad celíaca" />
                        </div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque atque officia, corporis
                            nam asperiores autem labore commodi quia, id consequuntur eos ea excepturi minima animi
                            deserunt maxime veritatis, voluptatibus esse?</p>
                    </div>
                </div>
                <div className="tab">
                    <input className="checkbox" type="checkbox" id="chtratamiento" />
                    <label className="tab-label" htmlFor="chtratamiento">Tratamiento</label>
                    <div className="tab-content">
                        <div className="info-img-container">
                            <img src="img/info/tratamiento.png" alt="Tratamiento de la enfermedad celíaca" />
                        </div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque atque officia, corporis
                            nam asperiores autem labore commodi quia, id consequuntur eos ea excepturi minima animi
                            deserunt maxime veritatis, voluptatibus esse?</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default InfoPage;