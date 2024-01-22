import { PublicarViajeModel } from "../models/PublicarViajeModel.js";
export const getPublicarViaje = async (req, res) => {

};
export const createPublicarViaje = async (req, res) => {
    try {
        const { latSalida, lngSalida, latDestino, lngDestino, fechaSalida, horaSalida, comodidad, numPasajero, precioViaje } = req.body;
        // res.status(200).json({datos:req.body})
        if (!(latSalida || lngSalida || latDestino || lngDestino || fechaSalida || horaSalida || comodidad || numPasajero || precioViaje)) {
            res.status(400).json({ message: "all input is required" });
        }
        const viaje = await PublicarViajeModel.create({
            latSalida, 
            lngSalida, 
            latDestino, 
            lngDestino, 
            fechaSalida, 
            horaSalida, 
            comodidad, 
            numPasajero, 
            precioViaje
        });
        res.status(201).json({messaje:viaje});
    } catch (error) {

    }

};
export const updatePublicarViaje = async (req, res) => {

};
export const deletePublicarViaje = async (req, res) => {

};

