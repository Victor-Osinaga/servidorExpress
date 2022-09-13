import {carritos} from './container.js'

const createNewCart = async () => {
  const cartCreated = await carritos.createNewCart()
  return cartCreated
}

const addToCart = async (idCart, idProduct) => {
  const addProduct = await carritos.addToCart(idCart, idProduct)
  return addProduct
}

const getCartProducts = async (idCart) => {
  const cartProducts = await carritos.getCartProducts(idCart)
  return cartProducts
}

const deleteProductFromCart = async (idCart, idProduct) => {
  const deletedProduct = await carritos.deleteProductFromCart(idCart, idProduct)
  return deletedProduct
}

const deleteCart = async (idCart) => {
  const carrito = await carritos.deleteCart(idCart)
  return carrito
}

export {
  createNewCart,
  addToCart,
  getCartProducts,
  deleteProductFromCart,
  deleteCart,
}