import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { DatosPersonalesModel } from "./DatosPersonalesModel.js";

export const VerifyUserProfileModel = sequelize.define(
  "VerifyUserProfiles",
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

DatosPersonalesModel.hasMany(VerifyUserProfileModel, { foreignKey: "users_id" });
VerifyUserProfileModel.belongsTo(DatosPersonalesModel, { foreignKey: "users_id" });
