    const app = require('./app')

    app.set('port', process.env.PORT || 5500) //Error en esta ruta

    app.get('*', (req, res) => {
        return res.status(404).json({msj: 'No found'})
    })

    // Iniciar el servidor
    app.listen(app.get ('port'), () => {
        console.log(`Servidor corriendo en el puerto: ${app.get('port')}`)
    })