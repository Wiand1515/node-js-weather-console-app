/* Importacion de axios */
const axios = require("axios");

class Busquedas {
  historial = ["Santiago"];

  constructor() {
    //Leer DB si existe
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



}

module.exports = Busquedas;
