const { Router } = require('express')

const { 
   consultarDirectores,
   consultarDirectorporId,
   createDirector,
   actualizarDirectorporId,
   editarDirectorPorID,
   deleteDirectorById } = require('../Controllers/DirectorCtrl')

const router = Router()

// Endpoint Consultar todos
router.get('/', consultarDirectores)

// Endpoint Consultar por ID
router.get('/:id', consultarDirectorporId)

// Endpoint Crear
router.post('/', createDirector)

// Actualizar un Género por ID
router.put('/:id', actualizarDirectorporId);

// Editar un Género por ID
router.patch('/:id', editarDirectorPorID);

// Eliminar un Género por ID
router.delete('/:id', deleteDirectorById);

module.exports = router
