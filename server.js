import express from 'express';
import {routerProductos as v1ProductosRouter} from './src/v1/routesProductos/routesProductos.js';
import {routerCarritos as v1CarritosRouter} from './src/v1/routesCarrito/routesCarritos.js';
// const v1CarritoRouter = require('./v1/routesProductos/routesCarrito.js')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/productos', v1ProductosRouter)
app.use('/api/v1/carritos', v1CarritosRouter)

app.listen(PORT, ()=> {
  console.log(`API is listening on port ${PORT}`);
})