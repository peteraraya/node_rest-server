// express
const express = require("express");
const app = express();

//bcrypt
const bcrypt = require('bcrypt');

const _ = require('underscore');

// Importamos el modelo
const Usuario = require('../models/usuario');



// GET
app.get("/usuario", function (req, res) {

    // Para obtner un get de la BD  utilizando find

    // Paginación  : si viene la variable  o asume que parte desde 0 
    let desde = req.query.desde || 0;
    // transformo string a number
    desde = Number(desde);

    let limite = req.query.limite || 5;  // si no espesifica la página lo dejo en 5
    limite = Number(limite);
    
    // estado: true --> condición que muestra solo registros con estado true
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)    // se salta los primeros (5)
        .limit(limite)   // limite de (5)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            // Mostrar el total de registros
            Usuario.count({ estado: true}, (err, conteo) => {

                // obtengo todos los usuarios
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            });


        })



});

// POST
app.post("/usuario", function (req, res) {
    // procesará todo el body
    let body = req.body;

    // creamos objeto usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // numero indica el largo
        role: body.role,
    });

    // Grabamos en la base de datos

    usuario.save((err, usuarioDB) => {
        // callback si sucede un error o un usuarrio grabado con su id
        // en caso de error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // evitar mostrar el password en la respuesta
        // usuarioDB.password = null;

        // si lo hace correctamente regresamos todo el usuario de base de datos
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

// PUT
app.put("/usuario/:id", function (req, res) {
    // obtengo el parametro de la ruta
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    // findByIdUpdate : busca por el Id y lo actualize si lo encuentra 
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        // una vez obtenemos un usuario de la base de datos, tambien es el esquema 
        // son options { new: true } : nos permite mostrar la información actualizada
        // runValidators : nos permite tomar las validaciones
        //  en caso de error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // retorne lo que sea que envie en el url
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });




});
// DELETE
app.delete("/usuario/:id", function (req, res) {

    // debemos saber cual es el id  que queremos borrar
    let id = req.params.id;

    // eliminando registro
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    }

    // como segundo argumento podemos enviar las propiedades que queremos actualizar
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }


        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    });
});


module.exports = app;