require('dotenv').config();
const { inquirerMenu, pause, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/search");

const main = async () => {
 const busquedas = new Busquedas();
    let opt;


  do {
    opt = await inquirerMenu();
    
    switch (opt) {
        case 1:
            //Mostrar mensaje
            const termino = await leerInput(`Ciudad: `);
            
            //buscar lugares
            const lugares = await busquedas.ciudad( termino );
            
            //seleccionar lugar
            const id = await listarLugares( lugares );
            if (id === 0) continue;

            const lugarSel = lugares.find(l => l.id === id);

            //guardar en DB
            busquedas.agregarHistorial( lugarSel.name );

            // datos del clima
            const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng )

            // mostrar resultados
            console.clear();
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Ciudad: ',lugarSel.name);
            console.log('Lat: ', lugarSel.lat);
            console.log('Lng:', lugarSel.lng);
            console.log('T°:', clima.temp);
            console.log('Min:', clima.min);
            console.log('Max:', clima.max);
            console.log('El clima esta: ', clima.desc)
            break;

        case 2:
          busquedas.historial.forEach( (lugar, i) => {
            const idx = `${ i + 1}`.green;
            console.log(`${idx} ${ lugar }`)
          })
          break;
    }






    if ( opt !== 0 ) await pause();


  } while (opt !== 0);
};






main();
