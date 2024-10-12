const {request, response} = require ('express')
const Productora = require('../Models/ProductoraMod')   

// (GET) Consultar todas las Productoras.
const consultarProductoras = async (req= request, res=response) => {
    try {
        const productoras = await Productora.find()
        return res.json(productoras)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: error})
    }
}
// (GET) Consultar una Productora por ID
const consultarProductoraporId = async (req = request, res = response) =>  {
    try {
        const id = req.params.id
        const productora = await Productora.findById(id)
        return res.json(productora)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: error})
    }
}
//(POST) Crear Productora.
const createProductora = async (req= request, res=response) => {
    
    try {
       const {nombre, slogan, descripcion}= req.body
       let data= {
        nombre,
        slogan, 
        descripcion        
        }
       const productora = new Productora (data)
       await productora.save()
       return res.status(201).json(productora)
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: error})
    }
}


// (PUT) Actualizar toda la Productora por ID.
const actualizarProductoraporId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, slogan, descripcion, estado, fechaCreacion, fechaActualizacion} = req.body;

        // Verificar que todos los campos requeridos están presentes
        if (!nombre || !slogan || !descripcion || !estado || !fechaCreacion || !fechaActualizacion ) {
            return res.status(400).json({ msj: 'Todos los campos son requeridos' });
        }

        // Actualizar la Productora con PUT
        const productoraActualizada = await Productora.findByIdAndUpdate(
            id, 
            { nombre, slogan, descripcion, estado, fechaCreacion, fechaActualizacion },
            { new: true }
        );

        if (!productoraActualizada) {
            return res.status(404).json({ msj: 'Productora no encontrada' });
        }

        return res.status(200).json(productoraActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: error.message || 'Error interno del servidor' });
    }
};

// (PATCH) Editar parcialmente la Productora por ID.
const editarProductoraPorID = async (req = request, res = response) => {
    try {
        const { nombre, slogan, descripcion} = req.body
        const id = req.params.id
        let data = {
            nombre, 
            slogan, 
            descripcion
        }
        data.fechaActualizacion = new Date()
        // Error si el nombre ya existe
        const productora = await Productora.findByIdAndUpdate(id, data, {new : true})
    
        return res.status(201).json(productora)
    } catch(error) {
        console.log(error)
        return res.status(500).json({ msj: error })
    }
}

//(Delete) Eliminar Productora.
const deleteProductoraById = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar la Productora por ID
        const productoraEliminada = await Productora.findByIdAndDelete(id);

        if (!productoraEliminada) {
            return res.status(404).json({ msj: 'Productora no encontrada' });
        }

        return res.status(200).json({ msj: 'Productora eliminada correctamente', productoraEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error al eliminar la Productora', error });
    }
};

module.exports = {
    consultarProductoras,
    consultarProductoraporId,
    createProductora,
    actualizarProductoraporId,
    editarProductoraPorID,
    deleteProductoraById
}
