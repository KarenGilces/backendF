import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

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
      type:DataTypes.STRING,
      allowNull:false,
    },
    precioViaje:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);