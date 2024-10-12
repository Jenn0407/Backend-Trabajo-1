const {request, response} = require ('express')
const Director = require('../Models/DirectorMod')   

// (GET) Consultar todos los Directores.
const consultarDirectores = async (req= request, res=response) => {
    try {
        const directores = await Director.find()
        return res.json(directores)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: error})
    }
}
// (GET) Consultar un Director por ID
const consultarDirectorporId = async (req = request, res = response) =>  {
    try {
        const id = req.params.id
        const director = await Director.findById(id)
        return res.json(director)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: error})
    }
}
//(POST) Crear Director.
const createDirector = async (req= request, res=response) => {
    
    try {
       const {nombre, documentoIdentidad}= req.body
       let data= {
        nombre, 
        documentoIdentidad
        }
       const director = new Director (data)
       await director.save()
       return res.status(201).json(director)
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: error})
    }
}


// (PUT) Actualizar todo el Director por ID.
const actualizarDirectorporId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, documentoIdentidad, estado, fechaCreacion, fechaActualizacion} = req.body;

        // Verificar que todos los campos requeridos están presentes
        if (!nombre || !documentoIdentidad || !estado || !fechaCreacion || !fechaActualizacion ) {
            return res.status(400).json({ msj: 'Todos los campos son requeridos' });
        }

        // Actualizar el Director con PUT
        const directorActualizado = await Director.findByIdAndUpdate(
            id, 
            { nombre, documentoIdentidad, estado, fechaCreacion, fechaActualizacion },
            { new: true }
        );

        if (!directorActualizado) {
            return res.status(404).json({ msj: 'Director no encontrado' });
        }

        return res.status(200).json(directorActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' });
    }
};

// (PATCH) Editar parcialmente el Director por ID.
const editarDirectorPorID = async (req = request, res = response) => {
    try {
        const { nombre, documentoIdentidad} = req.body
        const id = req.params.id
        let data = {
            nombre,
            documentoIdentidad
        }
        data.fechaActualizacion = new Date()
        // Error si el nombre ya existe
        const director = await Director.findByIdAndUpdate(id, data, {new : true})
    
        return res.status(201).json(director)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ msj: error })
    }
}

//(Delete) Eliminar Director.
const deleteDirectorById = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el Director por ID
        const directorEliminado = await Director.findByIdAndDelete(id);

        if (!directorEliminado) {
            return res.status(404).json({ msj: 'Director no encontrado' });
        }

        return res.status(200).json({ msj: 'Director eliminado correctamente', directorEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error al eliminar el Director', error });
    }
};

module.exports = {
    consultarDirectores,
    consultarDirectorporId,
    createDirector,
    actualizarDirectorporId,
    editarDirectorPorID,
    deleteDirectorById
}
