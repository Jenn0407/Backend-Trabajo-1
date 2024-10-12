const mongoose = require("mongoose")

const mongoConn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { //Error en esta ruta
            dbName: 'Casodeestudio'
        })
        console.log('Base de Datos Conectada')

    } catch (error) {   
        console.log('Error:', error)
        throw new Error ('Error de conexión')
    }
}

module.exports = {mongoConn}

