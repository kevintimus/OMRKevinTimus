const DataTypes  = require('sequelize');

//Rep per paràmetre la connexió a la bd
const getModelCity = (db) => {
  return db.define("city", {
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING(50),
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    last_update: {
      type: DataTypes.DATE,
    }
  });
}

module.exports = {getModelCity}
