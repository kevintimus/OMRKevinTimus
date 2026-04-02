// npm install express cors
// node server.js

const express = require('express');
const cors = require('cors');
const { DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const {crearConfigBaseDades} = require("./db.config.js")
const db = crearConfigBaseDades() // conexion a la base de dades

/*
const {getModelCity} = require("./models/city.model.js")
const City = getModelCity(db) // Model City de Sequalizer

const {getModelCountry} = require("./models/country.model.js")
const Country = getModelCountry(db) // Model Country de Sequalizer

app.post('/CrearPais', async (req, res) => {
  await City.create({city_id: 4, city: "Peru", country_id: 3, last_update: "2021-01-01" })
})
 */

const Empleat = require("./models/empleat")(db, DataTypes);

app.post('/altaEmpleat', async (req, res) => {
  const empleat = await Empleat.create(req.body)
  res.json(empleat)
})

const Doctor = require("./models/doctor")(db, DataTypes);

app.get('/llistaDoctors', async (req, res) => {
  const doctors = await Doctor.findAll({
    where: { doctor_hospital_codi: 22 }
  });
  res.json(doctors)
})

app.get('/empleatsDept/:id', async (req, res) => {
  const count = await Empleat.count({
    where: { empleat_dept_num: req.params.id }
  });
  res.json({ departament: req.params.id, numEmpleats: count });
})


app.put('/ModificarDoctor/:codiDoctor', async (req, res) => {
  await Doctor.update(req.body, {
    where: { doctor_codi: req.params.codiDoctor }
  })
  res.json( "Doctor modificat");
})

app.delete('/borrarEmpleado/:numEmpleado', async (req, res) => {
  await Empleat.destroy({
    where: { empleat_num: req.params.numEmpleado }
  });
  res.json( "Empleado borrado");
})


const Hospital = require("./models/hospital")(db, DataTypes);
const Sala = require("./models/sala")(db, DataTypes);

Hospital.hasMany(Sala, { foreignKey: 'sala_hospital_codi' });
Sala.belongsTo(Hospital, { foreignKey: 'sala_hospital_codi' });

app.get('/hospitalsInfo', async (req, res) => {
  const resultat = await Hospital.findAll({
    attributes: [
      'hospital_nom',
      [db.fn('COUNT', db.col('salas.sala_codi')), 'numSales'],
      [db.fn('SUM', db.col('salas.sala_nllits')), 'totalLlits']
    ],
    include: [{
      model: Sala,
      attributes: []
    }],
    group: ['hospital.hospital_codi']
  });
  res.json(resultat);
});

db.sync().then(() => {
  console.log("Drop and re-sync db")
})

app.listen(3000, () => console.log('Servidor a http://localhost:3000'));
