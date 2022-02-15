import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/Normalize.css';
import './styles/App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ContactoPage from './pages/ContactoPage';
import InfoPage from './pages/InfoPage';
import RecetasPage from './pages/RecetasPage';
import RecetasDulcesPage from './pages/recetas/RecetasDulcesPage';
import RecetasSaladasPage from './pages/recetas/RecetasSaladasPage';

function App() {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path="/" exact element={<HomePage />} /> 
          <Route path="/contacto" exact element={<ContactoPage />} /> 
          <Route path="/info" exact element={<InfoPage />} /> 
          <Route path="/recetas" exact element={<RecetasPage />} /> 
          <Route path="/recetas/recetasDulces" exact element={<RecetasDulcesPage />} /> 
          <Route path="/recetas/recetasSaladas" end element={<RecetasSaladasPage />} /> 
        </Routes>
        <Footer/> 
      </Router>
  );
}

export default App;
