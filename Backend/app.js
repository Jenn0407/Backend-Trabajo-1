const dotenv = require ('dotenv');
dotenv.config();
const express = require('express');
const app = express()
const { mongoConn } = require ('./ConexionBD')
mongoConn()

const cors = require ('cors')

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cors({
    origin : '*'
}))

const generos = require('./Router/GeneroRou')
app.use('/api/generos', generos)

const directores = require('./Router/DirectorRou')
app.use('/api/directores', directores)

const productoras = require('./Router/ProductoraRou')
app.use('/api/productoras', productoras)

const tipos = require('./Router/TipoRou')
app.use('/api/tipo', tipos)

const media = require('./Router/MediaRou')
app.use('/api/media', media)

module.exports = app
