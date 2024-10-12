const { Schema, model } = require('mongoose')
const MediaSchema = Schema({

    titulo : {
        type : String,
        required: [true, 'Nombre requerido']
    },
    sinopsis : {
        type : String,
        required: [true, 'Sinopsis requerido']          
    },
    estreno : {
        type : Date,
        default : new Date()
    },
    URL : {
        type : String,
        required: [true, 'URL es requerida']        
    },
    portada : {
        type : String, //Url de la imagen.
        required: true
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        
    },
    fechaCreacion : {
        type : Date,
        default : new Date()
    },
    fechaActualizacion : {
        type : Date,
        default : new Date()
    }    
})

module.exports = model('Media', MediaSchema)