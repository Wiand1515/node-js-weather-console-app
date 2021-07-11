const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que deseas hacer?",
    choices: [
      {
        value: 1,

        name: `${"1.".green} Buscar Ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  
    console.clear();
  console.log("============================".green);
  console.log("      Select an option".green);
  console.log("============================\n".green);

  const { opcion } = await inquirer.prompt(questions);

  return opcion;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "pause",
      message: `Presiona ${"ENTER".blue} para continuar`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listarLugares = async ( lugares = []) => {
  
    const choices = lugares.map( (lugar, i) => {
    
        const idx = `${i + 1}.`.green;

    return {
      value: lugar.id,
      name: `${idx} ${lugar.name}`,
    }
  });

  choices.unshift({
    value: "0",
    name: `${"0.".red} Volver al menu`,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione Ciudad:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const confirmar = async (msj) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message: msj,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const listadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);

  return ids;
};

/* Exportacion de modulos */
module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  listarLugares,
  confirmar,
  listadoChecklist,
};
