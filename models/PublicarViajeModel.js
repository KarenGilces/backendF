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
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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