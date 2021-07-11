const fs = require('fs');
/* Importacion de axios */
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = './db/database.json'

  constructor() {
    //Leer DB si existe
    this.leerDB();
  }

  //Getter para pasar los parametros
  get paramsMapBox() {
    return {
      access_token:
        process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'es'
    }
}

  async ciudad(lugar = "") {
    try {
      const instancia = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        //Calleamos el getter a traves de los params haciendo uso de la palabra this
        params: this.paramsMapBox
      });

      const resp = await instancia.get();
      return resp.data.features.map( lugar => ({
        id: lugar.id,
        name: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));


    } catch (err) {
      return [];
    }
  }

  async climaLugar( lat, lon ) {
    
    try {
      //instance axios

      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon }
    })
    const resp = await instance.get();
    


      return { 
        desc: resp.data.weather[0].description,
        min: resp.data.main.temp_min,
        max: resp.data.main.temp_max,
        temp: resp.data.main.temp
            }

    } catch (err) {
      console.log(err)      
    }
  }

  agregarHistorial( lugar = '') {
    if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
      return;
  }
    this.historial = this.historial.splice(0,5);
    this.historial.unshift(lugar.toLocaleLowerCase());

    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    };

    fs.writeFileSync( this.dbPath, JSON.stringify( payload ));
  }

  leerDB() {
    if(!fs.existsSync( this.dbPath )) return;

    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
    const data = JSON.parse( info );

    this.historial = data.historial;
  }

}

module.exports = Busquedas;
