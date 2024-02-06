import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { UserModel } from "./UserModel.js";
import { PublicarViajeModel } from "./PublicarViajeModel.js";


export const UserViajeModel = sequelize.define(
  "UserViajes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

UserModel.hasMany(UserModel, { foreignKey: "users_id" });
UserViajeModel.belongsTo(UserModel, { foreignKey: "users_id" });
PublicarViajeModel.hasMany(UserViajeModel, { foreignKey: "publish_id" });
UserViajeModel.belongsTo(PublicarViajeModel, { foreignKey: "publish_id" });