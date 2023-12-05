import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const TiposDocumentosModel = sequelize.define(
    "TiposDocumentos",{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    datos:{
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
const tiposData = [
    { datos: "Carnet" },
    { datos: "Cedula" }
   
  ];
  async function sedTiposD() {
    try {
      const tiposd = await TiposDocumentosModel.findAll();
      if(tiposd && tiposd.length <= 0){
        for (const tiposdData of tiposData) {
          await TiposDocumentosModel.create(tiposdData);
        }
      }
    } catch (error) {
      console.error("Error al insertar los tipos de documentos:", error);
    } 
  }

  sedTiposD();