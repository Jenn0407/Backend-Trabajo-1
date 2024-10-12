const {request, response} = require ('express')
const Media = require('../Models/MediaMod');
const { populate } = require('dotenv');

// Crear Media (POST)
const createMedia = async (req = request, res = response) => {
    const { titulo, sinopsis, URL, portada, estado, fechaCreacion, fechaActualizacion, estreno, genero, director,
        productora, tipo } = req.body;
    try {        
        const nuevaMedia = await Media.create({ titulo, sinopsis, URL, portada, estado, fechaCreacion, fechaActualizacion, estreno, genero, director,
            productora, tipo});
        return res.status(201).json(nuevaMedia);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error al crear la Media', error});
    }
};

// Consultar todos los registros de Media (GET)
const consultarMedias = async (req = request, res = response) => {
    try {
        const medias = await Media.find()
        .populate('genero')
        .populate('director')
        .populate('productora')
        .populate('tipo')
        
        return res.status(200).json(medias)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error al obtener registro de Media', error});
    }
};

// Consultar registro por ID (GET)
const consultarMediaId = async (req = request, res = response) =>  {
    try {
        const id = req.params.id
        const media = await Media.findById(id)
        .populate('genero')
        .populate('director')
        .populate('productora')
        .populate('tipo')

        if (!media) {
            return res.status(404).json({ msj: 'Media no encontrada' })
        }  
        return res.json(media)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: error})
    }
}
// Actualizar Media por ID (PUT)
const actualizarMediaId = async (req = request, res = response) => {
    try {
        console.log("Datos recibidos en la solicitud PUT:", req.body)

        const { id } = req.params;
        const {titulo, sinopsis, estreno, URL, portada, genero, director, productora, tipo, estado, fechaCreacion, fechaActualizacion } = req.body;
        
        if (
            !titulo || 
            !sinopsis || 
            !estreno || 
            !URL || 
            !portada || 
            !genero || 
            !director || 
            !productora || 
            !tipo || 
            estado === undefined ||
            !fechaCreacion || 
            !fechaActualizacion
        ) { 
            return res.status(404).json({ msj: 'Todos los campos son requeridos' });
        } 
        const mediaActualizada = await Media.findByIdAndUpdate(
            id, 
            { titulo, sinopsis, estreno, URL, portada, genero, director, productora, tipo, estado, fechaCreacion, fechaActualizacion },
            { new: true }
        ) 
        .populate('genero')
        .populate('director')
        .populate('productora')
        .populate('tipo')

        if (!mediaActualizada) {
            return res.status(404).json({ msj: 'Registro Media no encontrado' });
        }        
        return res.status(200).json(mediaActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj:'Error al actualizar', error});
    }
};
// (PATCH) Editar parcialmente un registro de Media por ID.
const editarMediaId = async (req = request, res = response) => {
    try {        
        const id = req.params.id
        const { titulo, sinopsis, URL, portada, estreno, genero, director, productora, tipo } = req.body

        let data = {titulo, sinopsis, URL, portada, estreno, genero, director, productora, tipo}
        data.fechaActualizacion = new Date()
        
        const mediaActualizada = await Media.findByIdAndUpdate(id, data, {new : true})
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo')

        if (!mediaActualizada) {
            return res.status(404).json({ msj: 'Registro Media no encontrado' });
        }
    
        return res.status(201).json(mediaActualizada)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ msj: error })
    }
}

// Eliminar un registro de Media por ID (DELETE)
const deleteMediabyId = async (req = request, res = response) => {
    const { id } = req.params;

    try {        
        const mediaEliminada = await Media.findByIdAndDelete(id);
        if (!mediaEliminada) {
            return res.status(404).json({ msj: 'Media no encontrada' });
        }
        return res.status(200).json({ msj: 'Media eliminada correctamente', mediaEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error al eliminar Media', error });
    }
};
module.exports = {
    createMedia,
    consultarMedias,
    consultarMediaId,
    actualizarMediaId,
    editarMediaId,
    deleteMediabyId
};
