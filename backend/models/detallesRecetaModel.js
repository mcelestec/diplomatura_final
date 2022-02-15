var pool = require('./bd');

async function getIngredientesByIdReceta(id) {
    try {
        var query = 'select * from ingredientes where idReceta = ? and deleted = 0';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getShortIngredientesByIdReceta(id) {
    try {
        var query = 'select id, descripcion from ingredientes where idReceta = ? and deleted = 0';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getIngredienteById(id) {
    try {
        var query = 'select * from ingredientes where id = ?';
        var rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function nuevoIngrediente(obj){
    try {
        var query = 'insert into ingredientes set ?, deleted = 0';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function eliminarIngrediente(id) {
    try {
        var query = 'update ingredientes set deleted = 1 where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function actualizarIngrediente(id, obj) {
    try {
        var query = 'update ingredientes set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

// Instrucciones

async function getInstruccionesByIdReceta(id) {
    try {
        var query = 'select * from instrucciones where idReceta = ? and deleted = 0 order by orden';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getShortInstruccionesByIdReceta(id) {
    try {
        var query = 'select id, descripcion from instrucciones where idReceta = ? and deleted = 0 order by orden';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getInstruccionById(id) {
    try {
        var query = 'select * from instrucciones where id = ?';
        var rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function nuevaInstruccion(obj){
    try {
        var query = 'insert into instrucciones set ?, deleted = 0';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function eliminarInstruccion(id) {
    try {
        var query = 'update instrucciones set deleted = 1 where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function nuevaInstruccion(obj){
    try {
        var query = 'insert into instrucciones set ?, deleted = 0';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function actualizarInstruccion(id, obj) {
    try {
        var query = 'update instrucciones set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getIngredientesByIdReceta, eliminarIngrediente, nuevoIngrediente, getIngredienteById, actualizarIngrediente,
    getInstruccionesByIdReceta, eliminarInstruccion, nuevaInstruccion, getInstruccionById, actualizarInstruccion,
    getShortIngredientesByIdReceta, getShortInstruccionesByIdReceta}