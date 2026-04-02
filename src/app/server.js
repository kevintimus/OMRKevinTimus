// npm install express cors
// node server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const {crearConfigBaseDades} = require("./db.config.js")
const db = crearConfigBaseDades() // conexion a la base de dades

const {getModelCity} = require("./models/city.model.js")
const City = getModelCity(db) // Model City de Sequalizer

const {getModelCountry} = require("./models/country.model.js")
const Country = getModelCountry(db) // Model Country de Sequalizer

db.sync().then(() => {
  console.log("Drop and re-sync db")
})

app.listen(3000, () => console.log('Servidor a http://localhost:3000'));
