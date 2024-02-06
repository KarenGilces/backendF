import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { UserModel } from "./UserModel.js";

export const PublicarViajeModel = sequelize.define(
  "publicarviajes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    latSalida:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    lngSalida:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    latDestino:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    lngDestino:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    // textSalida:{
    //   type:DataTypes.STRING,
    //   allowNull:false,
    // },
    // textDestino:{
    //   type:DataTypes.STRING,
    //   allowNull:false,
    // },
    fechaSalida:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    horaSalida:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    comodidad:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    numPasajero:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    precioViaje:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    stateViaje: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    viajeCompletado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

PublicarViajeModel.belongsTo(UserModel, { foreignKey: "user_publish" });
UserModel.hasMany(PublicarViajeModel, { foreignKey: "user_publish" });
