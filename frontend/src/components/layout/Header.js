import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/components/layout/Header.css';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const Header = (props) => { 
    return (
        <header>
            
            <label className="menu-responsive" htmlFor="menu"><MenuIcon className="menu-responsive" /></label>
            <input type="checkbox" id="menu" />
            <div className="logo">
                <img src="../img/logo.jpg" alt="Logo gluten free" />
            </div>
            <div className="nav-container">
                <nav>
                    <ul>
                        <li><NavLink className={(props) => (props.isActive ? "activo" : "")} to="/"><HomeIcon/>Home</NavLink></li>
                        <li><NavLink className={(props) => (props.isActive ? "activo" : "")} to="/info"><InfoIcon/>Información</NavLink></li>
                        <li><NavLink className={(props) => (props.isActive ? "activo" : "")} to="/recetas"><RestaurantIcon/>Recetas</NavLink></li>
                        <li><NavLink className={(props) => (props.isActive ? "activo" : "")} to="/contacto"><ContactSupportIcon/>Contacto</NavLink></li>
                    </ul>
                </nav>
            </div>            
        </header>
    );
}

export default Header;