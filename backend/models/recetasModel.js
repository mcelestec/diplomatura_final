var pool = require('./bd');

async function getRecetas() {
    try {
        var query = 'select id, titulo, tipo, nombre_imagen, DATE_FORMAT(fechaPublicacion, "%d-%m-%Y") fechaPublicacion from recetas where deleted=0 order by id desc';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getRecetasByTipo(tipo) {
    try {
        var query = 'select id, titulo, imagen from recetas where deleted=0 and tipo = ? order by id desc';
        var rows = await pool.query(query, [tipo]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function guardarNuevaReceta(obj){
    try {
        var query = 'insert into recetas set ?, fechaPublicacion = CURRENT_DATE(), deleted = 0';
        var rows = await pool.query(query, [obj]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function getRecetaById(id) {
    try {
        var query = 'select id, titulo, imagen, nombre_imagen, tipo, DATE_FORMAT(fechaPublicacion, "%d-%m-%Y") fechaPublicacion from recetas where id = ?';
        var rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function actualizarReceta(id, obj) {
    try {
        var query = 'update recetas set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function eliminarReceta(id) {
    try {
        var query = 'update recetas set deleted = 1 where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function uploadImage(id, image, nombre){
    try {
        var query = 'update recetas set imagen = ?, nombre_imagen = ? where id = ?';
        var rows = await pool.query(query, [image, nombre, id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function eliminarImagen(id){
    try {
        var query = 'update recetas set imagen = NULL, nombre_imagen = NULL where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getRecetas, guardarNuevaReceta, getRecetaById, actualizarReceta,  
    eliminarReceta, uploadImage, eliminarImagen, getRecetasByTipo}