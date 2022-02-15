var express = require('express');
var router = express.Router();
var recetasModel = require('./../../models/recetasModel')
var detallesRecetaModel = require('../../models/detallesRecetaModel')
var util = require('util')
var cloudinary = require('cloudinary').v2
const uploader = util.promisify(cloudinary.uploader.upload)
const destroy = util.promisify(cloudinary.uploader.destroy)


router.get('/', async function(req, res, next) {
  var recetas = await recetasModel.getRecetas();
  req.session.recetas = recetas;
  res.render('admin/recetas' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      recetas
  });
});

//invocado cuando el usuario hace clic en el símbolo + para agregar una receta
router.get('/nuevaReceta', async function(req, res, next) {
  let obj = {
    id: null,
    titulo : '',
    tipo : null,
  }

  res.render('admin/recetas' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      showNewModal: true,
      recetas: req.session.recetas,
      receta: obj
  });
});

// invocado para guardar una nueva receta
router.post('/guardarNuevaReceta', async (req, res, next) => {
  try {
      if (req.body.titulo != "" && req.body.tipo != null) {
          await recetasModel.guardarNuevaReceta(req.body);

          res.redirect('/admin/recetas');
      } else {
          let obj = {
            titulo : req.body.titulo,
            tipo : req.body.tipo,
          }

          res.render('admin/recetas' , {
              layout: 'admin/layout',
              nombre_usuario: req.session.nombre_usuario,
              id_usuario: req.session.id_usuario,
              showNewModal: true,
              error: true, 
              receta: obj,
              message: 'Todos los campos son requeridos',
              recetas: req.session.recetas
          });     
      }
  } catch (error) {
    console.log(error);

    res.render('admin/recetas' , {
        layout: 'admin/layout',
        nombre_usuario: req.session.nombre_usuario,
        id_usuario: req.session.id_usuario,
        process_error: true, 
        message: 'No se pudo crear la receta',
        recetas: req.session.recetas
    });  
  }
});

// invocado cuando el usuario quiere modificar una receta
router.get('/modificarReceta/:id', async (req, res, next) => {
  let receta = await recetasModel.getRecetaById(req.params.id);

  res.render('admin/recetas' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      showEditModal: true,
      receta,
      recetas: req.session.recetas
  });
});

// invocado cuando el usuario quiere guardar una receta modificada
router.post('/actualizarReceta', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.tipo != "") {
        let obj = {
          titulo : req.body.titulo,
          tipo: req.body.tipo
        }

        await recetasModel.actualizarReceta(req.body.id, obj);

        res.redirect('/admin/recetas');
    } else {
      let obj = {
        id: req.body.id,
        titulo : req.body.titulo,
        tipo : req.body.tipo,
        fechaPublicacion : req.body.fechaPublicacion,
      }

      res.render('admin/recetas' , {
          layout: 'admin/layout',
          nombre_usuario: req.session.nombre_usuario,
          id_usuario: req.session.id_usuario,
          showEditModal: true,
          error: true, 
          receta: obj,
          message: 'Todos los campos son requeridos',
          recetas: req.session.recetas
      });     
    }
  } catch (error) {
    console.log(error);
    res.render('admin/recetas' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      process_error: true, 
      message: 'No se pudo modificar la receta',
      recetas: req.session.recetas
  });  
  }
});

// invocado cuando el usuario quiere trabajar sobre los ingredientes e instrucciones de la receta
router.get('/modificarDetallesReceta/:id', async (req, res, next) => {
  let id = req.params.id;
  let receta = await recetasModel.getRecetaById(id);
  req.session.receta = receta;

  let ingredientes = await detallesRecetaModel.getIngredientesByIdReceta(id);
  req.session.ingredientes = ingredientes;

  let instrucciones = await detallesRecetaModel.getInstruccionesByIdReceta(id);
  req.session.instrucciones = instrucciones;

  res.render('admin/detallesReceta' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      receta, 
      ingredientes,
      instrucciones
  });
});

// invocado cuando el usuario quiere eliminar una receta
router.get('/eliminarReceta/:id', async (req, res, next) => {
    try {
        let receta = await recetasModel.getRecetaById(req.params.id);

        if (receta.imagen != null && receta.imagen != '') {
          await (destroy(receta.imagen));
        }   

        await recetasModel.eliminarReceta(req.params.id);

        res.redirect('/admin/recetas');
    } catch (error) {
        console.log(error);
        res.render('admin/recetas' , {
            layout: 'admin/layout',
            nombre_usuario: req.session.nombre_usuario,
            id_usuario: req.session.id_usuario,
            process_error: true, 
            message: 'No se pudo eliminar la receta',
            recetas: req.session.recetas 
        });  
     }
});

// invocado cuando el usuario quiere ver cómo se va a presentar la receta en el sitio web
router.get('/vistaPrevia/:id', async (req, res, next) => {
  let id = req.params.id;
  let receta = await recetasModel.getRecetaById(id);
  req.session.receta = receta;

  let imagen_receta = null;

  if (receta.imagen) {
    imagen_receta = cloudinary.image(receta.imagen, {
      crop:'fill', alt:'Imagen de '+receta.titulo
    });
  }

  let ingredientes = await detallesRecetaModel.getIngredientesByIdReceta(id);
  req.session.ingredientes = ingredientes;

  let instrucciones = await detallesRecetaModel.getInstruccionesByIdReceta(id);
  req.session.instrucciones = instrucciones;

  res.render('admin/vistaPreviaReceta' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      receta, 
      imagen_receta,
      ingredientes,
      instrucciones
  });
});

router.get('/subirImagenReceta/:id', async (req, res, next) => {
  let receta = await recetasModel.getRecetaById(req.params.id);
  req.session.receta = receta;

  if (receta.nombre_imagen != null && receta.nombre_imagen != '') {
      res.render('admin/recetas' , {
        layout: 'admin/layout',
        nombre_usuario: req.session.nombre_usuario,
        id_usuario: req.session.id_usuario,
        showConfirmUploadImageModal: true,
        receta,
        recetas: req.session.recetas
    });
  } else {
      res.render('admin/recetas' , {
          layout: 'admin/layout',
          nombre_usuario: req.session.nombre_usuario,
          id_usuario: req.session.id_usuario,
          showUploadImageModal: true,
          receta,
          recetas: req.session.recetas
      });
    }
});

router.get('/modificarImagen', async (req, res, next) => {
  res.render('admin/recetas' , {
      layout: 'admin/layout',
      nombre_usuario: req.session.nombre_usuario,
      id_usuario: req.session.id_usuario,
      showUploadImageModal: true,
      receta: req.session.receta,
      recetas: req.session.recetas
  });
});

router.get('/eliminarImagen/:id/:idImagen', async (req, res, next) => {
    await recetasModel.eliminarImagen(req.params.id);
    await (destroy(req.params.idImagen));

    res.redirect('/admin/recetas');
});


router.post('/uploadImage', async (req, res, next) => {
  try {
    var img_id = '';

    if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (img_id != "") {
        if (req.body.idImagenAnterior != null && req.body.idImagenAnterior != '') {
          await (destroy(req.body.idImagenAnterior));
        }   

        await recetasModel.uploadImage(req.body.id, img_id, imagen.name);

        res.redirect('/admin/recetas');
    } else {
        res.render('admin/recetas' , {
            layout: 'admin/layout',
            nombre_usuario: req.session.nombre_usuario,
            id_usuario: req.session.id_usuario,
            showUploadImageModal: true,
            error: true, 
            receta: obj,
            message: 'Todos los campos son requeridos',
            recetas: req.session.recetas
        });     
    }
  } catch (error) {
      console.log(error);
      res.render('admin/recetas' , {
        layout: 'admin/layout',
        nombre_usuario: req.session.nombre_usuario,
        id_usuario: req.session.id_usuario,
        process_error: true, 
        message: 'No se pudo actualizar la imagen de la receta',
        recetas: req.session.recetas
    });  
  }
});


module.exports = router;
