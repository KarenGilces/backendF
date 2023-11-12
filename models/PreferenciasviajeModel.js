import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";


export const PreferenciasviajeModel = sequelize.define(
  "preferenciasviaje",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
      preferencia: {
        type: DataTypes.STRING,
        allowNull: false,
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
  const PreferenciasData = [
    { preferencia: "Hablo por los codos!" },
    { preferencia: "Hablo cuando me siento comodo" },
    { preferencia: "No Hablo mucho" },
    { preferencia: "Fumar no supone un problema" },
    { preferencia: "Acepto paradas para fumar" }, 
    { preferencia: "No quiero que se fume" },
    { preferencia: "Con la música a todas partes!" }, 
    { preferencia: "Escucho música dependiendo la situación" },
    { preferencia: "El silencio es oro" }, 
    { preferencia: "Me encantan la mascotas. ¡Guau, guau!" },
    { preferencia: "Viajo con mascotas en función del animal" }, 
    { preferencia: "Prefiero no viajar con mascotas" }, 
    
  ];
  async function sedPreferencias() {
    try {
      const preferencia = await PreferenciasviajeModel.findAll();
      if(preferencia && preferencia.length <= 0){
        for (const PreferenciaData of PreferenciasData) {
          await PreferenciasviajeModel.create(PreferenciaData);
        }
      }
    } catch (error) {
      console.error("Error al insertar los colores:", error);
    } 
  }

  sedPreferencias();