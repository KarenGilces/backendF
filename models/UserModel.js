import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { TypeUsersModel } from "./TypeUsersModel.js";
import { DatosPersonalesModel } from "./DatosPersonalesModel.js";
import jwt from 'jsonwebtoken'; // Importa la biblioteca jsonwebtoken
import bcrypt from "bcrypt"; 

export const UserModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
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

TypeUsersModel.hasMany(UserModel, { foreignKey: "typeusers_id" });
UserModel.belongsTo(TypeUsersModel, { foreignKey: "typeusers_id" });
DatosPersonalesModel.hasMany(UserModel, { foreignKey: "datosperson_id" });
UserModel.belongsTo(DatosPersonalesModel, { foreignKey: "datosperson_id" });

const tipousuarioData = [
  { type: "Administrador" },
  { type: "Usuario" },
  // Agrega más objetos para insertar más datos si es necesario
];

let isAdminUserSeeded = false; // Bandera para verificar si el usuario administrador ya se ha insertado

async function seedTypeUsersAndAdminUser() {
  try {
    if (isAdminUserSeeded) {
      console.log("El usuario administrador ya se ha insertado en la base de datos.");
      return;
    }
    
    await sequelize.sync({ force: false });
    
    for (const userData of tipousuarioData) {
      await TypeUsersModel.create(userData);
    }
    console.log("Datos de tipos de usuarios insertados con éxito.");
    
    // Verifica si el nombre "Admin" ya existe en DatosPersonalesModel
    const existingAdminDatosPersonales = await DatosPersonalesModel.findOne({ where: { names: "Admin" } });
    
    if (!existingAdminDatosPersonales) {
      // Crea un registro en DatosPersonalesModel para el usuario administrador
      const adminDatosPersonales = await DatosPersonalesModel.create({
        names: "Admin",
        // Agrega otros campos según tu modelo DatosPersonalesModel
      });

      // Después de insertar los tipos de usuarios, crea un usuario administrador
      const adminTypeUser = await TypeUsersModel.findOne({ where: { type: "Administrador" } });

      if (adminTypeUser) {
        const adminUser = await UserModel.findOne({ where: { email: "admin@gmail.com" } });

        if (!adminUser) {
          const password = "12345678"; // Tu contraseña original
          const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña

          const adminUserData = {
            email: "admin@gmail.com",
            password: hashedPassword, // Guarda la contraseña encriptada
            typeusers_id: adminTypeUser.id,
            datosperson_id: adminDatosPersonales.id,
          };
          await UserModel.create(adminUserData);
          console.log("Usuario administrador insertado con éxito.");
          return;
        }
      }
    }
  } catch (error) {
    console.error("Error al insertar datos de tipos de usuarios y usuario administrador:", error);
  }
}

seedTypeUsersAndAdminUser();




