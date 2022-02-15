import {useState} from 'react';
import axios from 'axios';

import React from 'react'
import '../styles/components/pages/ContactoPage.css'
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import CommentIcon from '@material-ui/icons/Comment';

const ContactoPage = (props) => { 

    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(oldData => ({
            ...oldData, 
            [name] : value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true);
        const response = await axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(response.data.message);
        if (response.data.error === false) {
            setFormData(initialForm);
        }
    }

    return (
        <main className="main-contacto">
            <h2>Contacto</h2>

            <form className="form-contacto" onSubmit={handleSubmit}>
                <p className="normal-input-container">
                    <PersonIcon className="form-contacto-icon"/>
                    <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                </p>

                <p className="normal-input-container">
                    <PhoneIcon className="form-contacto-icon"/>
                    <input type="text" name="telefono" placeholder="Teléfono" value={formData.name} onChange={handleChange}/>
                </p>

                <p className="normal-input-container">
                    <EmailIcon className="form-contacto-icon"/>
                    <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                </p>

                <p className="large-input-container">
                    <CommentIcon className="form-contacto-icon"/>
                    <textarea name="mensaje" placeholder="Mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
                </p>
                {sending ? <p>Enviando...</p> : null}
                {msg? <p>{msg}</p>: null}
                <p>
                    <button className="button-large">Enviar</button>
                </p>

            </form>
        </main>

    );
}

export default ContactoPage;