import {
  createNewCart,
  addToCart,
  getCartProducts,
  deleteProductFromCart,
  deleteCart,
} from '../../database/carritos.js'

const createNewCartService = async () => {
  const cartCreated = await createNewCart()
  return cartCreated
}

const addToCartService = async (idCart, idProduct) => {
  idCart = parseInt(idCart)
  idProduct = parseInt(idProduct)
  const addProduct = await addToCart(idCart, idProduct)
  return addProduct
}

const getCartProductsService = async (idCart) => {
  idCart = parseInt(idCart)
  const cartProducts = await getCartProducts(idCart)
  return cartProducts
}

const deleteProductFromCartService = async (idCart, idProduct) => {
  idCart = parseInt(idCart)
  idProduct = parseInt(idProduct)
  const deletedProduct = await deleteProductFromCart(idCart, idProduct)
  return deletedProduct
}

const deleteCartService = async (idCart) => {
  idCart = parseInt(idCart)
  const carrito = await deleteCart(idCart)
  return carrito
}

export {
  createNewCartService,
  addToCartService,
  getCartProductsService,
  deleteProductFromCartService,
  deleteCartService,
}