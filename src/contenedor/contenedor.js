const fs = require('fs');

class Contenedor {
  constructor(route) {
    this.route = route;
  }
  
  getAll() {
    try {
      const data = fs.readFileSync(this.route, 'utf-8');
      console.log(data)
      return data ? JSON.parse(data) : 'vieja';
    } catch (error) {
      console.error(error);
    }
  }
  save(obj) {
    try {
      let data = this.getAll();
      obj.id = !data.length ? 1 : parseInt(data[data.length - 1].id) + 1;
      data.push(obj)
      fs.writeFileSync(this.route, JSON.stringify(data))
    } catch (err) {
      console.error(err);
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      const obj = data.find((x) => x.id == id);
      return obj ? obj : null;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getAll();
      const index = data.findIndex((obj) => obj.id == id);
      if (index > -1) {
        const newData = data.slice(0, index).concat(data.slice(index + 1));
        await this.writeFile(newData);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      await this.writeFile([]);
      console.log('Todos los elementos han sido eliminados');
    } catch (err) {
      console.error(err);
    }
  }
  async getRandomProduct(){
    try{
      const array = await this.getAll() ?? []
      const randomIndex = Math.floor(Math.random()*array.length)
      return this.getById(randomIndex+1)
    }catch(err){
      console.error(err)
    }
  }
}
const products = new Contenedor('./src/persistanceFiles/products.json');
const messages = new Contenedor('./src/persistanceFiles/messages.json');


module.exports = {products, messages}