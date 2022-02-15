
var express = require('express');
var router = express.Router();
var recetasModel = require('./../models/recetasModel');
var detallesRecetaModel = require('./../models/detallesRecetaModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/recetasDulces', async function(req, res, next) {
    let recetas = await recetasModel.getRecetasByTipo("dulce");
    const result = []
    for (const receta of recetas) {
        var ingredientes = await detallesRecetaModel.getShortIngredientesByIdReceta(receta.id);
        var instrucciones = await detallesRecetaModel.getShortInstruccionesByIdReceta(receta.id);
        var imagen_url = '';
        if (receta.imagen != null && receta.imagen != '') {
            imagen_url = cloudinary.url(receta.imagen, {
                crop:'fill', alt:'Imagen de '+receta.titulo
            });
        }

        let newReceta = {
            id : receta.id,
            tipo : receta.tipo,
            titulo : receta.titulo,
            ingredientes: ingredientes,
            instrucciones: instrucciones, 
            imagen_url: imagen_url,
        }
        result.push(newReceta)
    }
    res.json(result);
});

router.get('/recetasSaladas', async function(req, res, next) {
    let recetas = await recetasModel.getRecetasByTipo("salada");


    const result = []
    for (const receta of recetas) {
        var ingredientes = await detallesRecetaModel.getIngredientesByIdReceta(receta.id);
        var instrucciones = await detallesRecetaModel.getInstruccionesByIdReceta(receta.id);
        var imagen_url = '';
        if (receta.imagen != null && receta.imagen != '') {
            imagen_url = cloudinary.url(receta.imagen, {
                crop:'fill', alt:'Imagen de '+receta.titulo
            });
        }

        let newReceta = {
            id : receta.id,
            tipo : receta.tipo,
            titulo : receta.titulo,
            ingredientes: ingredientes,
            instrucciones: instrucciones, 
            imagen_url: imagen_url,
        }
        result.push(newReceta)
    }

    res.json(result);
});


router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'ccarignano@gmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contacto a través de la web y quiere más información a este correo: ${req.body.email}. <br>`
        +` Además, hizo el siguiente comentario: ${req.body.mensaje}. <br> Su tel es: ${req.body.telefono}.`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST, 
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASS
        }
    });

    await transport.sendMail(mail);

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });
})

module.exports = router;