"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
    },
    {}
  );
  Spot.associate = function (models) {
    Spot.belongsTo(models.User, { foreignKey: "userId" });
    Spot.hasMany(models.Image, {
      foreignKey: "spotId",
      onDelete: "cascade",
      hooks: true,
    });
    Spot.hasOne(models.Booking, {
      foreignKey: "spotId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Spot;
};
