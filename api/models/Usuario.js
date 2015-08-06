/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    nombre: {
      type:'string',
      required: true
    },
    apellidos: {
      type:'string',
      required: true
    },
    telefono1: {
      type:'string',
      required: false,
      defaultsTo: '000-112233'
    },
    telefono2: {
      type:'string',
      required: false,
      defaultsTo: '000000'
    },
    departamento: {
      model: 'departamento'
    },
    servicio: {
      model: 'servicio'
    }

  }
};
