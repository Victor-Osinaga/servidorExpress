import {
  createNewCartService,
  addToCartService,
  getCartProductsService,
  deleteProductFromCartService,
  deleteCartService,
} from '../../services/carritosService/carritosService.js'

const createNewCartController = async (req, res) => {
  const cartCreated = await createNewCartService()
  res.json({ status: "OK", idCart: cartCreated })
}

const addToCartController = async (req, res) => {
  const {body} = req
  const idProduct = (body.idProduct)
  const addProduct = await addToCartService(req.params.idCart, idProduct)
  res.json({status: "OK", data: addProduct})
}

const getCartProductsController = async (req, res) => {
  const cartProducts = await getCartProductsService(req.params.idCart)
  if (cartProducts == null){
    res.json({status: "OK", data: "Carrito vacio"})
  }else{
    res.json({status: "OK", data: cartProducts})
  }
}

const deleteProductFromCartController = async (req, res) => {
  const idCart = req.params.idCart
  const idProduct = req.params.idProduct
  const deletedProduct = await deleteProductFromCartService(idCart, idProduct)
  if(deletedProduct) {
    res.json({status: "OK", data: "Producto eliminado"})
  }else{
    res.json({status: "OK", error: `No se encuentra el producto en tu Carrito`})
  } 
}

const deleteCartController = async (req, res) => {
  const idCart = req.params.idCart
  const carrito = await deleteCartService(idCart)
  if(carrito){
    res.json({status: "OK", data: "Carrito vaciado correctamente"})
  }else{
    res.status(404).json({status: `404 Not Found`, error: "No se encuentra el carrito"})
  }
}

export {
  createNewCartController,
  addToCartController,
  getCartProductsController,
  deleteProductFromCartController,
  deleteCartController,
}