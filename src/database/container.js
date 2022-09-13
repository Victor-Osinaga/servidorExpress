import fs from 'fs';

class Contenedor{
  constructor(route){
    this.route=route;
  }

  async saveToDatabase (newDB) {
    fs.promises.writeFile(this.route, JSON.stringify(newDB, null, 2), {
      encoding: "utf-8",
    })
  }

  async getAll(){
    try {
      const data = await fs.promises.readFile(this.route, 'utf-8')
      // console.log(JSON.parse(data))
      return JSON.parse(data)
    } catch (error) {
      console.log(error);
      return {"productos": []}
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      const producto = await data.productos.find((product) =>product.id === id)
      if (producto){
        return producto
      }else{
        return false
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getByIdCart(id) {
    try {
      const data = await this.getAll();
      const carrito = await data.carritos.find((cart) =>cart.id === id)
      if (carrito){
        return carrito
      }else{
        return false
      }
    } catch (error) {
      console.error(error);
    }
  }

  async save(newProduct){
    try {
      const data = await this.getAll()
      const isAlreadyAdded = await data.productos.findIndex((producto)=> producto.nombre === newProduct.nombre) > -1;
      // const isAlreadyAdded = true
      if(isAlreadyAdded) {
        return null
        // return `El producto ya se encuentra en la base de datos.`
      }else{
        data.productos.push(newProduct)
        await this.saveToDatabase(data)
        return newProduct
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getAll()
      const productos = await data.productos
      const productoDelete = await this.getById(id)
      const newProducts = await productos.filter(product => product.id != id)
      const newProducts2 = {"productos": newProducts}
      const index = await productos.findIndex(product=>product.id == id)
      if(index != -1){
        await this.saveToDatabase(newProducts2)
        return productoDelete
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProducto(producto) {
    try {
      // const productos = await data.productos
      // const product = productos.find((obj) =>obj.id == producto.id);
      const data = await this.getAll();
      const productos = await data.productos
      const index = await productos.findIndex((obj) => obj.id == producto.id);
      if(index > -1){
        productos[index] = {
          id: producto.id,
          timestamp: new Date().toLocaleString('en-US', {timeZone: 'UTC'}),
          nombre: producto.nombre || productos[index].nombre,
          descripcion: producto.descripcion || productos[index].descripcion,
          codigo: producto.descripcion | productos[index].codigo,
          foto: producto.foto || productos[index].foto,
          precio: producto.precio || productos[index].precio,
          stock: producto.stock || productos[index].stock
        }
        await this.saveToDatabase({productos: productos})
        return producto
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createNewCart () {
    try {
      const data = await this.getAll()
      const carritos = await data.carritos
      const id = !carritos.length ? 1 : parseInt(carritos[carritos.length - 1].id) + 1;
      carritos.push({
        id: id,
        productos: []
      })
      await this.saveToDatabase(data)
      return id
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart (idCart, idProduct) {
    try {
      const data = await this.getAll()
      const carts = await data.carritos
      const cart = await this.getByIdCart(idCart)
      const addProduct = await productos.getById(idProduct)

      if(cart && addProduct){
        carts[cart.id - 1].productos.push(addProduct)
        await this.saveToDatabase(data)
        return addProduct
      }else if (!cart) {
        return 'Ups! No encontramos el carrito que buscas...';
      } else if (!addProduct) {
        return 'Ups! No existe ese producto...';
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCartProducts (idCart) {
    try {
      // const data = await this.getAll()
      // const carritos = await data.carritos
      const carrito = await this.getByIdCart(idCart)
      return carrito ? carrito.productos : null
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart (idCart, idProduct) {
    try {
      const data = await this.getAll()
      const carritos = await data.carritos
      const carrito = await this.getByIdCart(idCart)
      if(!carrito) return `No se encuentra el Carrito`

      const carritoIndex = await carritos.findIndex(cart=> cart.id == idCart)
      const productIndex = await carrito.productos.findIndex(product=> product.id == idProduct)
      if(productIndex > -1){
        carritos[carritoIndex].productos = carrito.productos.slice(0, productIndex).concat(carrito.productos.slice(productIndex + 1));
        await this.saveToDatabase(data)
        return true
      }else if(productIndex == -1){
        return false
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart (idCart) {
    try {
      const data = await this.getAll()
      const carritos = await data.carritos
      const carrito = await this.getByIdCart(idCart)

      if(!carrito)return false
      
      const index = carritos.findIndex(cart=>cart.id == idCart)
      carritos[index].productos = []
      await this.saveToDatabase(data)
      return true
    } catch (error) {
      console.log(error);
    }
  }
}

export const productos = new Contenedor('./src/database/productos.json');
export const carritos = new Contenedor('./src/database/carritos.json');