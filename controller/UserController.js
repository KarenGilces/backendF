import { UserModel } from "../models/UserModel.js";
import { DatosPersonalesModel } from "../models/DatosPersonalesModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_KEY } from "../config/config.js";


export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ['id', 'email','password', 'typeusers_id']
    },{where: {state:true}});
  
    res.status(200).json({users});
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
export const createUsers = async (req, res) => {
  try {
    const { names, email, password } = req.body;
    if (!(names ||  email ||  password )) {
      res.status(400).json({ message: "all input is required" });
    }
    // check if email already exist
    // Validate if email exist in our database
    const oldUser = await UserModel.findOne({ where: { email: email } });
    if (oldUser) {
      return res.status(409).json("email already exist");
    }
    //Encrypt user password
   const encryptedPassword = await bcrypt.hash(password.toString(),10);
    // Create user in our database
    const d =  await DatosPersonalesModel.create({
      names:names
    });
    const users = await UserModel.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      typeusers_id:2,
      datosperson_id:d.id
    });
    
    // Create token
    const token = jwt.sign({ user_id: users.id, email }, TOKEN_KEY, {
      expiresIn: "1h",
    });
    // save user token
    // users.token = token;
    res.status(201).json({ users, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateUsers = async (req, res) => {
  const { user } = req.body;
  if (!(user)) {
    res.status(400).json({ message: "user is required" });
  }
  const userD= await UserModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,user:user});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const updateUsersEmail = async (req, res) => {
  const { email } = req.body;
  if (!(email)) {
    res.status(400).json({ message: "email is required" });
  }
  const oldUser = await UserModel.findOne({ where: { email: email } });
  if (oldUser) {
    return res.status(409).json("email already exist");
  }
  const userD= await UserModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,email:email});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const updateUserPassword = async (req, res) => {
  const { password } = req.body;
  if (!(password)) {
    res.status(400).json({ message: "password is required" });
  }
  const userD= await UserModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,password:password});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};

export const updateUsersPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await UserModel.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Encriptar la nueva contraseña antes de guardarla
    const saltRounds = 10; // Número de rondas de sal (ajusta según tus necesidades)
    const newPassword = await bcrypt.hash(password, saltRounds);

    // Asignar la contraseña encriptada al usuario
    user.password = newPassword;
    
    // Guardar el usuario actualizado en la base de datos
    await user.save();

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteUsers = async (req, res) => {
  const user = await UserModel.findOne({ where: { id: req.params.id } });
  if (user) {
    user.set({ ...user, state: false });
    await user.save();
   return  res.status(200).json({ message: "delete" });
  } else {
    return res.status(404).json({ message: "type not found" });
  }
};
export const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email || password)) {
      res.status(400).json({message:"All input is required"});
    }
    // Validate if user exist in our database
    const user = await UserModel.findOne({
      where: { email: email.toLowerCase() },
    });
    const persona = await DatosPersonalesModel.findOne({ where: { id: user.datosperson_id } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY, {
        expiresIn: "1h",
      });
      // user
      let dataUser={
          id:user.id,
          email:user.email,
         // typeusers_id:user.typeusers_id,
          usuario:persona.names,
          person_id:persona.id
      }
     return  res.status(200).json({ dataUser, token: token });
    }
    return res.status(400).json({message:"Invalid credentials"});
  } catch (err) {
    
    return res.status(500).json({ error:"error"});
  }
  // Our register logic ends here
};
export const logout = async (req, res)=>{
}
export const refresh = (req, res) => {
	
  const token = req.headers["authorization"].split(" ")[1];
	if (!token) {
		return res.status(401).end()
	}

	var payload
	try {
		payload = jwt.verify(token, 'secret')
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	}
	// (END) The code uptil this point is the same as the first part of the `welcome` route

	// We ensure that a new token is not issued until enough time has elapsed
	// In this case, a new token will only be issued if the old token is within
	// 30 seconds of expiry. Otherwise, return a bad request status
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
	if (payload.exp - nowUnixSeconds > 30) {
		return res.status(400).end()
	}

	// Now, create a new token for the current user, with a renewed expiration time
	const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})

	// Set the new token as the users `token` cookie
	res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 })
	res.end()
}

export const uploadImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({'message':'No se proporcionó una imagen'});
    }
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(req.file.mimetype)) {
      const persona= await DatosPersonalesModel.findOne({where:{id:req.params.id}});
      if(persona){
        const nombreImagen = req.file.filename;
        persona.set({...persona,foto:nombreImagen});
        await persona.save();
        res.status(200).json({ message: "Imagen subida con éxito" , img:persona.foto});
        }else{
        res.status(404).json({message: "Usuario no encontrado"});
      }
    } else {
      res.status(404).json({message: "Solo se permiten archivos JPEG, PNG y JPG"});
    }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};