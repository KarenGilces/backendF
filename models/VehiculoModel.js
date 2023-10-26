import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import {  DatosPersonalesModel } from "./DatosPersonalesModel.js";
import { MarcaModel } from "./MarcaModel.js";
import { ModeloModel } from "./ModeloModel.js";
import { TipoVehiculoModel } from "./TipoVehiculoModel.js";
import { ColorModel } from "./ColorModel.js";

export const VehiculoModel = sequelize.define(
  "vehiculos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
      placa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      anioPublicacion: {
        type: DataTypes.STRING,
        allowNull: false,
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

MarcaModel.hasMany(VehiculoModel, { foreignKey: "marca_id" });
VehiculoModel.belongsTo(MarcaModel, { foreignKey: "marca_id" });
DatosPersonalesModel.hasMany(VehiculoModel, { foreignKey: "datospersonales_id" });
VehiculoModel.belongsTo(DatosPersonalesModel, { foreignKey: "datospersonales_id" });
ColorModel.hasMany(VehiculoModel, { foreignKey: "color_id" });
VehiculoModel.belongsTo(ColorModel, { foreignKey: "color_id" });
TipoVehiculoModel.hasMany(VehiculoModel, { foreignKey: "tipoVehiculo_id" });
VehiculoModel.belongsTo(TipoVehiculoModel, { foreignKey: "tipoVehiculo_id" });
ModeloModel.hasMany(VehiculoModel, { foreignKey: "modelo_id" });
VehiculoModel.belongsTo(ModeloModel, { foreignKey: "modelo_id" });