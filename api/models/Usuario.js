/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    nombre: {
      type:'string'
    },
    apellidos: {
      type:'string'
    },
    telefono1: {
      type:'string',
      required: false,
    },
    telefono2: {
      type:'string',
      required: false,
      defaultsTo: '000000'
    },
    correo: {
      type:'string',
      required: false,
    },
    sede: {
      type:'string',
      required: false,
    },
    departamento: {
      model: 'departamento'
    },
    servicio: {
      model: 'servicio'
    }

  }
};
