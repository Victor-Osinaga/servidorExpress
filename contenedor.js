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
    } catch (error) {
      throw new Error(`eror al guardar datos ${error}`)
    }
  }

  async getById(id){
    let objs = await this.getAll();
    let obj = objs.filter(o=>o.id==id)
    if(obj.length==0){
      return `No se puede obtener el dato con el id: ${id}`
    }
    return obj
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
    let objs = await this.getAll();
    let obj = objs.filter(o=>o.id!==id)
    try {
      // return obj
      await fs.writeFile(this.ruta, JSON.stringify(obj,null,2))
    } catch (error) {
      return `No se puede borrar ese obj`
    }
  }
  
  async deleteAll(){
    try {
      await fs.writeFile(this.ruta, JSON.stringify([],null,2))
    } catch (error) {
      return `no se pudo borrar`
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

let producto = new Contenedor('./productos.txt')
module.exports = producto

// producto.save({producto:"Lavarropas", precio: "15.60", tumbnail: "tumbnail 1"})

// function ejecutar(cb){
//   setTimeout(() => {
//     cb()
//   }, 2500);
// }

// ejecutar(()=>{
//   producto.save({producto:"Lavarropas", precio: "15.60", tumbnail: "tumbnail 1"})

  
//   ejecutar(()=>{
//     producto.save({producto:"Cuadro", precio: "5.99", tumbnail: "tumbnail 2"})
    
//     ejecutar(()=>{
//       producto.save({producto:"Silla", precio: "21.99", tumbnail: "tumbnail 3"})
      
//       ejecutar(()=>{
//         producto.save({producto:"Lámpara", precio: "99.99", tumbnail: "tumbnail 4"})
        
//         ejecutar(()=>{
//           producto.getById(2)
//             .then((data)=>{
//               console.log(data)
//             }).catch((err)=>{
//               console.log(err);
//             })
      
//             ejecutar(()=>{
//               producto.getAll()
//                 .then((data)=>{
//                   console.log(data)
//                 })
      
//                 ejecutar(()=>{
//                   producto.deleteById(2)
//                     .then((data)=>{
//                       console.log('se elimino el registro')
//                     }).catch((err)=>{
//                       console.log(err);
//                     })
      
//                     ejecutar(()=>{
//                       producto.deleteAll()
//                         .then((data)=>{
//                           console.log('se elimino TODO')
//                         }).catch((err)=>{
//                           console.log(err);
//                         })
//                       })
//                   })
//               })
//           })
//       })
//     })
//   })
// })