const { Router } = require('express')

const { 
    consultarTipos,
    consultarTipoId,
    createTipo,
    actualizarTipoId,
    editarTipoID,
    deleteTipoById } = require('../Controllers/TipoCtrl')

const router = Router()

// Endpoint Consultar todos
router.get('/', consultarTipos)

// Endpoint Consultar por ID
router.get('/:id', consultarTipoId)

// Endpoint Crear
router.post('/', createTipo)

// Actualizar un Tipo por ID
router.put('/:id', actualizarTipoId);

// Editar un Tipo por ID
router.patch('/:id', editarTipoID);

// Eliminar un Tipo por ID
router.delete('/:id', deleteTipoById);

module.exports = router
