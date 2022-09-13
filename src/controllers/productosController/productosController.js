import { 
  getAllProductosService, 
  getOneProductoService, 
  createNewProductoService, 
  deleteProductoService,
  updateProductoService,
} from '../../services/productosService/productosServices.js';

import { isAdmin } from '../isAdmin/isAdmin.js';
// const isAdmin = false

const getAllProductosController = async (req,res) => {
  const allProductos = await getAllProductosService();
  res.send({ status: "OK", data: allProductos })
}

const getOneProductoController = async (req, res) => {
  const producto = await getOneProductoService(req.params.productoId);
  if(producto == false){
    res.send({ status: "OK", data: "No se encuentra el producto, revise el ID" });
  }else{
    res.send({ status: "OK", error: producto });
  }
}

const createNewProductoController = async (req, res) => {
  const { body } = req;
  if (isAdmin){
    if (
      !body.nombre ||
      !body.descripcion ||
      !body.codigo ||
      !body.foto ||
      !body.precio ||
      !body.stock
    ) {
      return 
    }
    
    const newProducto = {
      nombre: body.nombre,
      descripcion: body.descripcion,
      codigo: body.codigo,
      foto: body.foto,
      precio: body.precio,
      stock: body.stock,
    }
    const createNewProducto = await createNewProductoService(newProducto)
    if(createNewProducto == null){
      res.status(422).json({ error: "422 Unprocessable Entity", data: 'El producto ya se encuentra registrado' })
    }else {
      res.status(201).json({ status: "OK", data: createNewProducto })
    }
  }else {
    res.status(403).json({ error: `403 Forbidden`, data: `DELETE reservado para admins` });
  }
}

const deleteProductoController = async (req, res) => {
  if (isAdmin){
    const deleteProduct = await deleteProductoService(req.params.productoId);
    res.status(201).json({ status: "OK", data: deleteProduct });
  }else {
    res.status(403).json({ error: `403 Forbidden`, data: `POST reservado para admins` });
  }
}

const updateProductoController = async (req, res) => {
  if(isAdmin) {
    const {body} = req
    const updateProducto = {
      id : parseInt(req.params.productoId),
      nombre : body.nombre,
      descripcion : body.descripcion,
      codigo : body.codigo,
      foto : body.foto,
      precio : body.precio,
      stock : body.stock
    }
    const updatedProducto = await updateProductoService(updateProducto)
    res.status(201).json({ status: "OK actualizado", data: updatedProducto });
  }else{
    res.status(403).json({ error: `403 Forbidden`, data: `PUT reservado para admins` });
  }
}

export {
  getAllProductosController,
  getOneProductoController,
  createNewProductoController,
  deleteProductoController,
  updateProductoController,
}