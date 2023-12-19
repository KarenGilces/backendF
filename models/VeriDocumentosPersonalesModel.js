import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import {  TiposDocumentosModel } from "./TiposDocumentosModel.js";
import {  DatosPersonalesModel } from "./DatosPersonalesModel.js";


export const VeriDocumentosPersonalesModel = sequelize.define(
  "VeriDocumentosPersonales",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
  },
  
  {
    timestamps: false,
  }
  
);
TiposDocumentosModel.hasMany(VeriDocumentosPersonalesModel, { foreignKey: "id_tipoDocumento" });
VeriDocumentosPersonalesModel.belongsTo(TiposDocumentosModel, { foreignKey: "id_tipoDocumento" });
DatosPersonalesModel.hasMany(VeriDocumentosPersonalesModel, { foreignKey: "id_datosPersonales" });
VeriDocumentosPersonalesModel.belongsTo(DatosPersonalesModel, { foreignKey: "id_datosPersonales" });
