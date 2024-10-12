const {request, response} = require ('express')
const Tipo = require('../Models/TipoMod')

// (GET) Consultar todos los Tipos.
const consultarTipos = async (req= request, res=response) => {
    try {
        const tipos = await Tipo.find()
        return res.json(tipos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: error})
    }
}
// (GET) Consultar Tipo por ID
const consultarTipoId = async (req = request, res = response) =>  {
    try {
        const id = req.params.id
        const tipo = await Tipo.findById(id)
        return res.json(tipo)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: error})
    }
}
//(POST) Crear Tipo.
const createTipo = async (req= request, res=response) => {
    
    try {
       const {nombre, descripcion}= req.body
       let data= {
        nombre, 
        descripcion
       }
       const tipo = new Tipo (data)
       await tipo.save()
       return res.status(201).json(tipo)
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: error})
    }
}


// (PUT) Actualizar todo el Tipo por ID.
const actualizarTipoId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, estado, fechaCreacion, fechaActualizacion, descripcion } = req.body;

        // Verificar que todos los campos requeridos están presentes
        if (!nombre || !estado || !fechaCreacion || !fechaActualizacion || !descripcion) {
            return res.status(400).json({ msj: 'Todos los campos son requeridos' });
        }

        // Actualizar el Tipo con PUT
        const tipoActualizado = await Tipo.findByIdAndUpdate(
            id, 
            { nombre, estado, fechaCreacion, fechaActualizacion, descripcion },
            { new: true }
        );

        if (!tipoActualizado) {
            return res.status(404).json({ msj: 'Tipo no encontrado' });
        }

        return res.status(200).json(tipoActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' });
    }
};

// (PATCH) Editar parcialmente el Tipo por ID.
const editarTipoID = async (req = request, res = response) => {
    try {
        const { nombre, descripcion} = req.body
        const id = req.params.id
        let data = {
            nombre,
            descripcion
        }
        data.fechaActualizacion = new Date()
        // Error si el nombre ya existe
        const tipo = await Tipo.findByIdAndUpdate(id, data, {new : true})
    
        return res.status(201).json(tipo)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ msj: error })
    }
}

//(Delete) Eliminar Tipo.
const deleteTipoById = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el Tipo por ID
        const tipoEliminado = await Tipo.findByIdAndDelete(id);

        if (!tipoEliminado) {
            return res.status(404).json({ msj: 'Tipo no encontrado' });
        }

        return res.status(200).json({ msj: 'Tipo eliminado correctamente', tipoEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error al eliminar el Tipo', error });
    }
};

module.exports = {
    consultarTipos,
    consultarTipoId,
    createTipo,
    actualizarTipoId,
    editarTipoID,
    deleteTipoById
}

