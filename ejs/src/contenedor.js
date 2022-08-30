const {promises:fs} = require('fs')
class Contenedor{

  constructor(ruta){
    this.ruta=ruta;
  }

  async save(obj){
    let objs = await this.getAll();
    let ident = !objs.length ? 1 : parseInt(objs[objs.length - 1].id) + 1;
    obj={id:ident, ...obj}
    let datos = [...objs, obj]
    try {
      await fs.writeFile(this.ruta, JSON.stringify(datos,null,2))
      return obj
    } catch (error) {
      throw new Error(`eror al guardar datos ${error}`)
    }
  }

  async getById(id){
    id = parseInt(id)
    let objs = await this.getAll();
    let obj = objs.filter(o=>o.id === id)
    if(obj.length==0){
      return false
    }else{
      return obj
    }
  }
  
  async getAll(){
    try {
      const objetos = await fs.readFile(this.ruta)
      return JSON.parse(objetos)
    } catch (error) {
      return []
    }
  }

  async deleteById(id){
    id=parseInt(id)
    let objs = await this.getAll();
    let newProducts = await objs.filter(o => o.id != id)
    const index = await objs.findIndex(prod=>prod.id == id)

    if(index != -1){
      await fs.writeFile(this.ruta, JSON.stringify(newProducts,null,2))
      return newProducts
    }else {
      return false
    }
  }
  
  async deleteAll(){
    try {
      await fs.writeFile(this.ruta, JSON.stringify([],null,2))
    } catch (error) {
      return `no se pudo borrar`
    }
  }

  async updateProducto(id, obj){
    id = parseInt(id)
    let products = await this.getAll();
    let productoIndex = await products.findIndex(producto => producto.id == id)

    if(productoIndex != -1){

      // console.log("antes", products[productoIndex]);

      products[productoIndex].title = obj.title || products[productoIndex].title
      products[productoIndex].price = obj.price || products[productoIndex].price
      products[productoIndex].thumbnail = obj.thumbnail || products[productoIndex].thumbnail
      products[productoIndex].id = obj.id || products[productoIndex].id

      // console.log("actualizado", products[productoIndex]);
      // console.log("productossss", products)

      await fs.writeFile(this.ruta, JSON.stringify(products,null,2))
      return products[productoIndex];
    }else{
      return false;
    }
    
  }

  async getRandomProduct(){
    try{
      const array = await this.getAll()
      const randomIndex = Math.floor(Math.random()*array.length)
      return this.getById(randomIndex+1)
    }catch(err){
      console.error(err)
    }
  }
}

let productos = new Contenedor('./src/productos.txt')
module.exports = productos

// producto.save({producto:"Lavarropas", precio: "15.60", tumbnail: "tumbnail 1"})

// function ejecutar(cb){
//   setTimeout(() => {
//     cb()
//   }, 2500);
// }


// producto.save({producto:"Lavarropas", precio: "15.60", tumbnail: "tumbnail 1"})
// producto.save({producto:"Cuadro", precio: "5.99", tumbnail: "tumbnail 2"})
// producto.save({producto:"Silla", precio: "21.99", tumbnail: "tumbnail 3"})
// producto.save({producto:"Lámpara", precio: "99.99", tumbnail: "tumbnail 4"})
// producto.getById(2)

//   .then((data)=>{
//     console.log(data)
//   }).catch((err)=>{
//     console.log(err);
//   })
      

// producto.getAll()
//   .then((data)=>{
//     console.log(data)
//   })
      

// producto.deleteById(2)
//   .then((data)=>{
//     console.log('se elimino el registro')
//   }).catch((err)=>{
//     console.log(err);
//   })
      
// producto.deleteAll()
//   .then((data)=>{
//     console.log('se elimino TODO')
//   }).catch((err)=>{
//     console.log(err);
//   })