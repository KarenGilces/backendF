import { VerificationTypeModel } from "../models/VerificationTypeModel.js";

export const getVerificationType = async (req, res) => {
    try {
        const types = await VerificationTypeModel.findAll({ where: { state: true } });
        res.status(200).json(types);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

export const createVerificationType = async (req, res) => {
  try {
    // Get type input
    const { type } = req.body;
    // Validate type input
    if (typeof type !== 'boolean') {
      res.status(400).json({ message: "type must be a boolean" });
      return; // Agregado para salir de la función después de enviar la respuesta de error
    }
    // Create type in our database
    const createdType = await VerificationTypeModel.create(req.body);

    res.status(201).json({ message: "Created", type: createdType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVerificationType = async (req, res) => {
    if (!req.body.type) {
        res.status(400).json({ message: "type is required" });
      }
      const type = await VerificationTypeModel.findOne({ where: { id: req.params.id } });
      if (type) {
        type.set(req.body);
        await type.save();
        res.status(200).json({ message: "update" });
      } else {
        res.status(404).json({ message: "type not found" });
      }
};
export const deleteVerificationType= async (req, res) => {
    const type = await VerificationTypeModel.findOne({ where: { id: req.params.id } });
    if (type) {
      type.set({ ...type, state: false });
      await type.save();
      res.status(200).json({ message: "delete" });
    } else {
      res.status(404).json({ message: "type not found" });
    }
};
