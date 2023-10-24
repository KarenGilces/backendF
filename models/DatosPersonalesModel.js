import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { CantonModel } from "./CantonModel.js";

export const DatosPersonalesModel = sequelize.define(
  "datosPersonales",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'images/anonimo.png' // Valor por defecto para la foto
    },
    minBibliografia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    acercade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resena: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calificacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    timestamps: false,
  }
);
