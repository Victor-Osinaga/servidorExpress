import express from 'express'
import { 
  createNewCartController,
  addToCartController,
  getCartProductsController,
  deleteProductFromCartController,
  deleteCartController,
} from '../../controllers/carritosController/carritosController.js'


const routerCarritos = express.Router();

routerCarritos.post('/', createNewCartController);
routerCarritos.post('/:idCart/productos', addToCartController);
routerCarritos.get('/:idCart/productos', getCartProductsController);
routerCarritos.delete('/:idCart/productos/:idProduct', deleteProductFromCartController);
routerCarritos.delete('/:idCart', deleteCartController);

export {routerCarritos}