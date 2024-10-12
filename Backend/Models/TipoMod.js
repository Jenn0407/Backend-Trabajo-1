const {Schema, model} = require('mongoose')
const TipoSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        unique: [true, 'Este nombre ya existe']
    },
    estado: {
        type: Boolean,
        default: true,
        
    },    
    descripcion: {
        type: String,
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Tipo', TipoSchema)