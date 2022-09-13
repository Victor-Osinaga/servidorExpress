import express from 'express'
import {
  getAllProductosController,
  getOneProductoController,
  createNewProductoController,
  deleteProductoController,
  updateProductoController,
} from '../../controllers/productosController/productosController.js'

const routerProductos = express.Router();

routerProductos.get('/', getAllProductosController);

routerProductos.get('/:productoId', getOneProductoController);

routerProductos.post('/', createNewProductoController);

routerProductos.delete('/:productoId', deleteProductoController);

routerProductos.put('/:productoId', updateProductoController);

export {routerProductos}