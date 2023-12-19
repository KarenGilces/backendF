import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const VerificationTypeModel = sequelize.define("VerificationTypes", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: false,
});

const TypeData = [
  { type: true },  // Cambiado a valor booleano true
  { type: false }, // Cambiado a valor booleano false
];

async function setType() {
  try {
    const types = await VerificationTypeModel.findAll();
    if (types.length === 0) { // Verifica si la tabla está vacía
      for (const typeData of TypeData) {
        await VerificationTypeModel.create(typeData);
      }
    }
  } catch (error) {
    console.error("Error al insertar los types:", error);
  } 
}

setType();
