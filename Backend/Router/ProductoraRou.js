const { Router } = require('express')

const { 
    consultarProductoras,
    consultarProductoraporId,
    createProductora,
    actualizarProductoraporId,
    editarProductoraPorID,
    deleteProductoraById } = require('../Controllers/ProductoraCtrl')

const router = Router()

// Endpoint Consultar todos
router.get('/', consultarProductoras)

// Endpoint Consultar por ID
router.get('/:id', consultarProductoraporId)

// Endpoint Crear
router.post('/', createProductora)

// Actualizar una Productora por ID
router.put('/:id', actualizarProductoraporId);

// Editar una Productora por ID
router.patch('/:id', editarProductoraPorID);

// Eliminar una Productora por ID
router.delete('/:id', deleteProductoraById);

module.exports = router