const {Schema, model} = require('mongoose')
const ProductoraSchema = Schema ({
    
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        unique: [true, 'Este nombre ya existe']
    },
    slogan: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    descripcion: {
        type: String,
        required: [true, 'Nombre requerido']    
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
    }
 
})

module.exports = model('Productora', ProductoraSchema)