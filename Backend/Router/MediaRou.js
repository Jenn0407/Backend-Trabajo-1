const { Router } = require('express')

const { 
    createMedia,
    consultarMedias,
    consultarMediaId,
    actualizarMediaId,
    editarMediaId,
    deleteMediabyId } = require('../Controllers/MediaCtrl')

const router = Router()

// Endpoint Consultar todos
router.get('/', consultarMedias)

// Endpoint Consultar por ID
router.get('/:id', consultarMediaId)

// Endpoint Crear
router.post('/', createMedia)

// Actualizar un Tipo por ID
router.put('/:id', actualizarMediaId);

// Editar un Tipo por ID
router.patch('/:id', editarMediaId);

// Eliminar un Tipo por ID
router.delete('/:id', deleteMediabyId);

module.exports = router
