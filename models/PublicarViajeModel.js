import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const PublicarViajeModel = sequelize.define("Viajes",{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
},
{
    timestamps:false
}
)