import { PublicarViajeModel } from "../models/PublicarViajeModel.js";
import { Sequelize } from 'sequelize';
export const getPublicarViaje = async (req, res) => {

};

export const getViajesFilter = async (req, res) => {
    try{
        const latSalida = req.body.lat_lngSalida._lat
        const lngSalida = req.body.lat_lngSalida._lng
        const latDestino = req.body.lat_lngDestino._lat
        const lngDestino = req.body.lat_lngDestino._lng
        const fecha = req.body.fecha
        const cantidad = req.body.cantidad
        const datos = await PublicarViajeModel.findAll({
            attributes: ['id'],
          where: {
            latSalida: -1.0518528,
            lngSalida: -79.8130176,
            latDestino: -1.0225124,
            lngDestino: -79.4604035,
            fechaSalida: '2024-02-22',
            numPasajero: {
                [Sequelize.Op.gt]: 3
            }
          }});
        res.status(201).json({message: datos})
    }catch{
        res.status(500).json({ error: error.message });
    }
};

export const createPublicarViaje = async (req, res) => {
    try {
        const { latSalida, lngSalida, latDestino, lngDestino, fechaSalida, horaSalida, comodidad, numPasajero, precioViaje,stateViaje,viajeCompletado,user_publish } = req.body;
        // res.status(200).json({datos:req.body})
        if (!(latSalida || lngSalida || latDestino || lngDestino || fechaSalida || horaSalida || comodidad || numPasajero || precioViaje || user_publish || stateViaje || viajeCompletado)) {
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
            precioViaje,
            stateViaje,
            viajeCompletado,
            user_publish
        });
        res.status(201).json({messaje:viaje});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
export const updatePublicarViaje = async (req, res) => {

};
export const deletePublicarViaje = async (req, res) => {

};

