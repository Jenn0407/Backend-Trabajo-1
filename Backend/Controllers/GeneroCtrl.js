const {request, response} = require ('express')
const Genero = require('../Models/GeneroMod')

// (GET) Consultar todos los Géneros
const consultarGeneros = async (req= request, res=response) => {
    try {
        const generos = await Genero.find()
        return res.json(generos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: error})
    }
}
// (GET) Consultar un Género por ID
const consultarGeneroporId = async (req = request, res = response) =>  {
    try {
        const id = req.params.id
        const genero = await Genero.findById(id)
        return res.json(genero)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: error})
    }
}
//(POST) Crear Género.
const createGenero = async (req= request, res=response) => {
    
    try {
       const {nombre, descripcion}= req.body
       let data= {
        nombre, 
        descripcion
       }
       const genero = new Genero (data)
       await genero.save()
       return res.status(201).json(genero)
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: error})
    }
}


// (PUT) Actualizar todo el Género por ID.
const actualizarGeneroporId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, estado, fechaCreacion, fechaActualizacion, descripcion } = req.body;

        // Verificar que todos los campos requeridos están presentes
        if (!nombre || !estado || !fechaCreacion || !fechaActualizacion || !descripcion) {
            return res.status(400).json({ msj: 'Todos los campos son requeridos' });
        }

        // Actualizar el Género con PUT
        const generoActualizado = await Genero.findByIdAndUpdate(
            id, 
            { nombre, estado, fechaCreacion, fechaActualizacion, descripcion },
            { new: true }
        );

        if (!generoActualizado) {
            return res.status(404).json({ msj: 'Género no encontrado' });
        }

        return res.status(200).json(generoActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' });
    }
};

// (PATCH) Editar parcialmente el Género por ID.
const editarGeneroPorID = async (req = request, res = response) => {
    try {
        const { nombre, descripcion} = req.body
        const id = req.params.id
        let data = {
            nombre,
            descripcion
        }
        data.fechaActualizacion = new Date()
        // Error si el nombre ya existe
        const genero = await Genero.findByIdAndUpdate(id, data, {new : true})
    
        return res.status(201).json(genero)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ msj: error })
    }
}

//(Delete) Eliminar Género.
const deleteGeneroById = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el Género por ID
        const generoEliminado = await Genero.findByIdAndDelete(id);

        if (!generoEliminado) {
            return res.status(404).json({ msj: 'Género no encontrado' });
        }

        return res.status(200).json({ msj: 'Género eliminado correctamente', generoEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error al eliminar el género', error });
    }
};

module.exports = {
    consultarGeneros,
    consultarGeneroporId,
    createGenero,
    actualizarGeneroporId,
    editarGeneroPorID,
    deleteGeneroById
}

