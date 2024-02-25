
import { PublicarViajeModel } from "./PublicarViajeModel.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { UserModel} from "./UserModel.js";

export const CalificacionModel = sequelize.define(
  "valoracion",
  {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    resena: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      calificacion: {
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

PublicarViajeModel.hasMany(CalificacionModel, { foreignKey: "publicarviajes_id" });
CalificacionModel.belongsTo(PublicarViajeModel, { foreignKey: "publicarviajes_id" });
UserModel.hasMany(CalificacionModel, { foreignKey: "user_id" });
CalificacionModel.belongsTo(UserModel, { foreignKey: "user_id" });