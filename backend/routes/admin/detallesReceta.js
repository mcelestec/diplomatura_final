var express = require('express');
var router = express.Router();
var detallesRecetaModel = require('../../models/detallesRecetaModel')

router.get('/nuevoIngrediente', async function(req, res, next) {
    res.render('admin/detallesReceta' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      receta: req.session.receta, 
      ingredientes: req.session.ingredientes,
      instrucciones: req.session.instrucciones,
      showNewIngredienteModal: true
    });
});

router.post('/crearIngrediente', async (req, res, next) => {
  try {
      if (req.body.descripcion != "") {
        await detallesRecetaModel.nuevoIngrediente(req.body);

        res.redirect('/admin/recetas/modificarDetallesReceta/'+req.body.idReceta);
      } else {
        let obj = {
          id: req.body.id,
          idReceta : req.body.idReceta,
          descripcion : req.body.descripcion
        }
        
        res.render('admin/detallesReceta' , {
          layout: 'admin/layout',
          nombre_usuario: req.session.nombre_usuario,
          id_usuario: req.session.id_usuario,
          receta: req.session.receta,
          ingredientes: req.session.ingredientes,
          instrucciones: req.session.instrucciones,
          showNewIngredienteModal: true,
          error: true,
          ingrediente: obj,
          message: 'Todos los campos son requeridos',
        });     
      }
  } catch (error) {
    console.log(error);
    res.render('admin/detallesReceta' , {
        layout: 'admin/layout',
        nombre_usuario: req.session.nombre_usuario,
        id_usuario: req.session.id_usuario,
        error: true, message: 'No se cargó el ingrediente'
    });  
  }
});

router.get('/modificarIngrediente/:id', async (req, res, next) => {
  let ingrediente = await detallesRecetaModel.getIngredienteById(req.params.id);

  res.render('admin/detallesReceta', {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      ingrediente,
      receta: req.session.receta,
      ingredientes: req.session.ingredientes,
      instrucciones: req.session.instrucciones,
      showModificarIngredienteModal: true
  });
});

router.post('/actualizarIngrediente', async (req, res, next) => {
  try {
    if (req.body.descripcion != "") {
        let obj = {
          descripcion : req.body.descripcion,
        }

        await detallesRecetaModel.actualizarIngrediente(req.body.id, obj);

        res.redirect('/admin/recetas/modificarDetallesReceta/'+req.body.idReceta);
    } else {
        let obj = {
          id: req.body.id,
          idReceta : req.body.idReceta,
          descripcion : req.body.descripcion
        }

        res.render('admin/detallesReceta' , {
            layout: 'admin/layout',
            nombre_usuario: req.session.nombre_usuario,
            id_usuario: req.session.id_usuario,
            ingrediente: obj,
            receta: req.session.receta,
            ingredientes: req.session.ingredientes,
            instrucciones: req.session.instrucciones,
            showModificarIngredienteModal: true,
            error: true,
            message: 'Todos los campos son requeridos',
        });     
    }
  } catch (error) {
      console.log(error);
      res.render('admin/detallesReceta' , {
        layout: 'admin/layout',
        nombre_usuario: req.session.nombre_usuario,
        id_usuario: req.session.id_usuario,
        process_error: true, 
        message: 'No se pudo modificar el ingrediente',
        receta: req.session.receta,
        ingredientes: req.session.ingredientes,
        instrucciones: req.session.instrucciones
    });  
  }
});


router.get('/eliminarIngrediente/:id', async (req, res, next) => {
  try {
      await detallesRecetaModel.eliminarIngrediente(req.params.id);

      res.redirect('/admin/recetas/modificarDetallesReceta/'+req.session.receta.id);
    } catch (error) {
      console.log(error);
      res.render('admin/detallesReceta' , {
        layout: 'admin/layout',
        nombre_usuario: req.session.nombre_usuario,
        id_usuario: req.session.id_usuario,
        process_error: true, 
        message: 'No se pudo eliminar el ingrediente',
        receta: req.session.receta,
        ingredientes: req.session.ingredientes,
        instrucciones: req.session.instrucciones
    });  
   }
});


// Instrucciones

router.get('/nuevaInstruccion', async function(req, res, next) {
  res.render('admin/detallesReceta' , {
    layout: 'admin/layout',
    nombre_usuario: req.session.nombre_usuario,
    id_usuario: req.session.id_usuario,
    receta: req.session.receta, 
    ingredientes: req.session.ingredientes,
    instrucciones: req.session.instrucciones,
    showNewInstruccionModal: true
  });
});

router.post('/crearInstruccion', async (req, res, next) => {
try {
    if (req.body.descripcion != "" && req.body.orden != "") {
      await detallesRecetaModel.nuevaInstruccion(req.body);

      res.redirect('/admin/recetas/modificarDetallesReceta/'+req.body.idReceta);
    } else {
      let obj = {
        id: req.body.id,
        idReceta : req.body.idReceta,
        descripcion : req.body.descripcion,
        orden: req.body.orden        
      }
      
      res.render('admin/detallesReceta' , {
        layout: 'admin/layout',
        nombre_usuario: req.session.nombre_usuario,
        id_usuario: req.session.id_usuario,
        receta: req.session.receta,
        ingredientes: req.session.ingredientes,
        instrucciones: req.session.instrucciones,
        showNewInstruccionModal: true,
        error: true,
        instruccion: obj,
        message: 'Todos los campos son requeridos',
      });     
    }
} catch (error) {
  console.log(error);
  res.render('admin/detallesReceta' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      error: true, message: 'No se cargó la instrucción'
  });  
}
});

router.get('/modificarInstruccion/:id', async (req, res, next) => {
let instruccion = await detallesRecetaModel.getInstruccionById(req.params.id);

res.render('admin/detallesReceta', {
    layout: 'admin/layout',
    nombre_usuario: req.session.nombre_usuario,
    id_usuario: req.session.id_usuario,
    instruccion,
    receta: req.session.receta,
    ingredientes: req.session.ingredientes,
    instrucciones: req.session.instrucciones,
    showModificarInstruccionModal: true
});
});

router.post('/actualizarInstruccion', async (req, res, next) => {
try {
  if (req.body.descripcion != "") {
      let obj = {
        descripcion : req.body.descripcion,
        orden: req.body.orden
      }

      await detallesRecetaModel.actualizarInstruccion(req.body.id, obj);

      res.redirect('/admin/recetas/modificarDetallesReceta/'+req.body.idReceta);
  } else {
      let obj = {
        id: req.body.id,
        idReceta : req.body.idReceta,
        descripcion : req.body.descripcion,
        orden: req.body.orden
      }

      res.render('admin/detallesReceta' , {
          layout: 'admin/layout',
          nombre_usuario: req.session.nombre_usuario,
          id_usuario: req.session.id_usuario,
          instruccion: obj,
          receta: req.session.receta,
          ingredientes: req.session.ingredientes,
          instrucciones: req.session.instrucciones,
          showModificarInstruccionModal: true,
          error: true,
          message: 'Todos los campos son requeridos',
      });     
  }
} catch (error) {
    console.log(error);
    res.render('admin/detallesReceta' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      process_error: true, 
      message: 'No se pudo modificar la instruccion',
      receta: req.session.receta,
      ingredientes: req.session.ingredientes,
      instrucciones: req.session.instrucciones
  });  
}
});


router.get('/eliminarInstruccion/:id', async (req, res, next) => {
try {
    await detallesRecetaModel.eliminarInstruccion(req.params.id);

    res.redirect('/admin/recetas/modificarDetallesReceta/'+req.session.receta.id);
  } catch (error) {
    console.log(error);
    res.render('admin/detallesReceta' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      process_error: true, 
      message: 'No se pudo eliminar la instruccion',
      receta: req.session.receta,
      ingredientes: req.session.ingredientes,
      instrucciones: req.session.instrucciones
  });  
 }
});

module.exports = router;
