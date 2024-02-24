import { PublicarViajeModel } from "../models/PublicarViajeModel.js";
import { Sequelize } from 'sequelize';
import { UserModel } from "../models/UserModel.js";
import { DatosPersonalesModel } from "../models/DatosPersonalesModel.js";
export const getPublicarViaje = async (req, res) => {

};

export const getViajeUser = async (req, res) => {
    const viajeId = req.query.id;  // Acceder al id desde los parámetros de la consulta (?id=1)
    const viaje = await PublicarViajeModel.findOne({
        where: { id: viajeId },
        
        include: [
            {
              model: UserModel, 
              include :[
                {model: DatosPersonalesModel}
              ]
            }
          ]
      });
    let datosViaje = {
        id:viaje.id,
        textSalida:viaje.textSalida,
        textDestino:viaje.textDestino,
        fechaSalida:viaje.fechaSalida,
        horaSalida:viaje.horaSalida,
        comodidad:viaje.comodidad,
        numPasajero:viaje.numPasajero,
        precioViaje:viaje.precioViaje,
        user_id:viaje.user.id,
        datosPersonales_id:viaje.user.datosPersonale.id,
        names:viaje.user.datosPersonale.names,
        lastname:viaje.user.datosPersonale.lastname,
        celular:viaje.user.datosPersonale.celular,
        sexo:viaje.user.datosPersonale.sexo,
        foto:viaje.user.datosPersonale.foto,
        resena:viaje.user.datosPersonale.resena,
        calificacion:viaje.user.datosPersonale.calificacion,
    }
    res.status(201).json(datosViaje);
};

function haversine(latReq, lonReq, latDB, lonDB) {
    // Radio de la Tierra en kilómetros
    const R = 6371.0;

    // Convierte las coordenadas de grados a radianes
    const [rlat1, rlon1, rlat2, rlon2] = [latReq, lonReq, latDB, lonDB].map(coord => (coord * Math.PI) / 180);

    // Diferencia de latitud y longitud
    const dlat = rlat2 - rlat1;
    const dlon = rlon2 - rlon1;

    // Fórmula de Haversine
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distancia en kilómetros
    const distance = R * c;

    return distance;
}

export const getViajesFilter = async (req, res) => {
    try {
        const latSalida = req.body.lat_lngSalida._lat
        const lngSalida = req.body.lat_lngSalida._lng
        const latDestino = req.body.lat_lngDestino._lat
        const lngDestino = req.body.lat_lngDestino._lng
        const fecha = req.body.fecha
        const cantidad = req.body.cantidad
        let datosFiltrados = [];
        let datosFiltradosNoFecha = [];
        const radius_km = 10.0;

        if (!(latSalida || lngSalida || latDestino || lngDestino || fecha || cantidad )) {
            res.status(400).json({ message: "all input is required" });
        }

        let datos = await PublicarViajeModel.findAll({
            // attributes:[],
            where: {
                fechaSalida: fecha,
                numPasajero: {
                    [Sequelize.Op.gte]: cantidad
                }
            }
        });

        let datosNoFecha = await PublicarViajeModel.findAll({
            where: {
                fechaSalida: {
                    [Sequelize.Op.not]: fecha
                },
                numPasajero: {
                    [Sequelize.Op.gte]: cantidad
                }
            }
        });


        datos.forEach(dato => {
            let latSDB = dato.latSalida, lngSDB = dato.lngSalida
            let distanceS = haversine(latSalida, lngSalida, latSDB, lngSDB);
            if (distanceS <= radius_km) {
                let latDDB = dato.latDestino, lngDDB = dato.lngDestino
                let distanceD = haversine(latDestino, lngDestino, latDDB, lngDDB);
                if (distanceD <= radius_km) {
                    datosFiltrados.push(dato);
                }
            }
        })

        datosNoFecha.forEach(dato => {
            let latSDB = dato.latSalida, lngSDB = dato.lngSalida
            let distanceS = haversine(latSalida, lngSalida, latSDB, lngSDB);
            if (distanceS <= radius_km) {
                let latDDB = dato.latDestino, lngDDB = dato.lngDestino
                let distanceD = haversine(latDestino, lngDestino, latDDB, lngDDB);
                if (distanceD <= radius_km) {
                    datosFiltradosNoFecha.push(dato);
                }
            }
        })

        let datosFiltradosTransformados = datosFiltrados.map(dato => ({
            id:dato.id,
            textSalida:dato.textSalida,
            textDestino:dato.textDestino,
            precioViaje:dato.precioViaje,
            numPasajero:dato.numPasajero
        }))

        let datosFiltradosTransformadosNoFecha = datosFiltradosNoFecha.map(dato => ({
            id:dato.id,
            textSalida:dato.textSalida,
            textDestino:dato.textDestino,
            precioViaje:dato.precioViaje,
            numPasajero:dato.numPasajero,
            fecha:dato.fechaSalida
        }))

        const respuesta = {
            datosFecha: datosFiltradosTransformados,
            datosNoFecha: datosFiltradosTransformadosNoFecha
          };

        if(datosFiltrados.length > 0 || datosFiltradosNoFecha.length > 0){
            res.status(201).json(respuesta)
        }else{
            res.status(201).json( {message: "NO EXISTEN VIAJES PROGRAMADOS"})
        }
        
    } catch {
        res.status(500).json({ error: error.message });
    }
};

export const createPublicarViaje = async (req, res) => {
    try {
        const { latSalida, lngSalida, textSalida ,latDestino, lngDestino, textDestino,fechaSalida, horaSalida, comodidad, numPasajero, precioViaje, stateViaje, viajeCompletado, user_publish } = req.body;
        // res.status(200).json({datos:req.body})
        if (!(latSalida || lngSalida || latDestino || lngDestino || fechaSalida || horaSalida || comodidad || numPasajero || precioViaje || user_publish || stateViaje || viajeCompletado || textDestino || textSalida)) {
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
            textDestino,
            textSalida,
            user_publish
        });
        res.status(201).json({ messaje: viaje });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
export const updatePublicarViaje = async (req, res) => {

};
export const deletePublicarViaje = async (req, res) => {

};

