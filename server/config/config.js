
// process : es un objeto global que esta corriendo por toda la app de node


// =================
// Puerto 
// =================
process.env.PORT = process.env.PORT || 3000

// =================
// Entorno 
// =================
process.env.NODE_ENV = process.env.NODE_ENV || "dev"

// =================
// Base de datos 
// =================
let urlDB;

if ( process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
}else{
    urlDB = "mongodb+srv://peternt:kprKrVM8Lnro89eo@cluster0.pvdzf.mongodb.net/cafe";
}
process.env.URLDB = urlDB;

