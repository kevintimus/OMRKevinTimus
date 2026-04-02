const DataTypes = require('sequelize');

//Rep per paràmetre la connexió a la bd
const getModelCountry = (db) => {
  return db.define("country", {
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING(45),
    },
    last_update: {
      type: DataTypes.DATE,
    }
  });
}

module.exports = {getModelCountry}
