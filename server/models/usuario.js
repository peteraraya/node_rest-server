// este archivo trabajará todo el modelo de datos
const mongoose = require('mongoose');

// validators
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values  : ['ADMIN_ROLE', 'USER_ROLE' ], // valores permitidos
    message : '{VALUE} no es un rol válido' // mensaje de validación
}

// esquema de mongoose
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'el nombre es necesario']
    },
    email:{
        type: String,
        unique: true, // será unico en la bd
        required: [true, 'el correo es necesario']
    },
    password:{
        type:   String,
        required: [true, 'la contraseña es obligatoria']
    },
    img:{
        type: String,
        required: false  // no es obligatoria
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    } 
});

// No mostrar el campo password ** NO USAR FUNCIÖN DE FLECHA **
usuarioSchema.methods.toJSON = function(){
    let user        = this;
    let userObject  = user.toObject(); // selecciono todo el esquema
    delete userObject.password; // evitamos mostrar password

    return userObject;
}

// le decimos a este esquema que utilize un plugin en particular 
usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único'} );


module.exports = mongoose.model('Usuario', usuarioSchema);