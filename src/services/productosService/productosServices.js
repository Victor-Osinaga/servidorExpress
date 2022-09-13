import {
  getAllProductos,
  getOneProducto,
  createNewProducto,
  deleteProducto,
  updateProducto,
} from '../../database/productos.js'

const getAllProductosService = async () => {
  const allProductos = await getAllProductos()
  return allProductos
}

const getOneProductoService = async (id) => {
  id = parseInt(id)
  const producto = await getOneProducto(id)
  return producto
}

const createNewProductoService = async (newProducto) => {
  const data = await getAllProductos()
  // const productos = await data.productos
  // console.log(productos)
  let id = !data.productos.length ? 1 : parseInt(data.productos[data.productos.length - 1].id) + 1;
  // let id = 33
  const productoToInsert = {
    id: id,
    timestamp: new Date().toLocaleString('en-US', {timeZone: 'UTC'}),
    ...newProducto,
  }

  const createdProducto = await createNewProducto(productoToInsert)
  return createdProducto
}

const deleteProductoService = async (id) => {
  id = parseInt(id)
  const deleteProduct = await deleteProducto(id)
  return deleteProduct
}

const updateProductoService = async (updateProduct) => {
  const updatedProducto = await updateProducto(updateProduct)
  return updatedProducto
}

export {
  getAllProductosService,
  getOneProductoService,
  createNewProductoService,
  deleteProductoService,
  updateProductoService,
}