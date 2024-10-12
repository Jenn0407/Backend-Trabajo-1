const { Router } = require('express')

const { 
    consultarGeneros,
    consultarGeneroporId,
    createGenero,
    actualizarGeneroporId,
    editarGeneroPorID,
    deleteGeneroById } = require('../Controllers/GeneroCtrl')

const router = Router()

// Endpoint Consultar todos
router.get('/', consultarGeneros)

// Endpoint Consultar por ID
router.get('/:id', consultarGeneroporId)

// Endpoint Crear
router.post('/', createGenero)

// Actualizar un Género por ID
router.put('/:id', actualizarGeneroporId);

// Editar un Género por ID
router.patch('/:id', editarGeneroPorID);

// Eliminar un Género por ID
router.delete('/:id', deleteGeneroById);

module.exports = router
