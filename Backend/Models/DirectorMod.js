const {Schema, model} = require('mongoose')
const DirectorSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        unique: [true, 'Este nombre ya existe']
    },

    documentoIdentidad: {
        type: String,  
        required: [true, 'Documento de identidad requerido'],
        unique: true,  
    },
        
    estado: {
        type: Boolean,
        default: true,
    },

    fechaCreacion: {
        type: Date,
        default: new Date()
    },

    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
})

module.exports = model('Director', DirectorSchema)