require('./config/config');

const express = require('express');
const app = express();

// bodyparser
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())


// GET
app.get('/usuario', function (req, res) {
    res.json('getusuario')
});
// POST
app.post('/usuario', function (req, res) {

    // procesará todo el body
    let body = req.body;

    if ( body.nombre === undefined) {
        
        res.status(400).json({
            ok: false,
            mensaje:'el nombre es necesario'
        }); // bad request

    }else{

        res.json({
            persona: body
        });
    }

});
// PUT
app.put('/usuario/:id', function (req, res) {
    // obtengo el parametro de la ruta
    let id = req.params.id; 
    // retorne lo que sea que envie en el url
    res.json({
        id
    });

});

app.delete('/usuario', function (req, res) {
    res.json('deleteusuario')
});

app.listen(process.env.PORT, () =>{
    console.log('escuchando puerto 3000');
});


// 