// import { productos as newDB } from './productos.json';
// import { saveToDatabase } from './utils';
import {productos} from './container.js';

const getAllProductos = async () => {
  return await productos.getAll()
}

const getOneProducto = (id) => {
  const producto = productos.getById(id)
  return producto
}

const createNewProducto = async (newProducto) => {
  const newProduct = await productos.save(newProducto)
  return newProduct
}

const deleteProducto = async (id) => {
  const deleteProduct = await productos.deleteById(id)
  return deleteProduct
}

const updateProducto = async (updateProducto)=> {
  const updatedProducto = await productos.updateProducto(updateProducto)
  return updatedProducto
}

export { 
  getAllProductos,
  getOneProducto,
  createNewProducto,
  deleteProducto,
  updateProducto,
}