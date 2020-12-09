require("./config/config");
// express
const express = require("express");
// mongoose
const mongoose = require("mongoose");

const app = express();

// bodyparser
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// vincular con routes usuarios
app.use( require('./routes/usuario')); 

// mongoose connect
mongoose.connect(
  process.env.urlDB,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    // definir un callback en caso de abrir o no la conexion
    if ( err ) throw err;
    console.log("BD Online");
  }
);


app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});