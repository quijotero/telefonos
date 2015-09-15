/**
* Servicio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
		nombre: {
			type: 'string'
		}
    /* No hace falta la relacion inversa, saber usuarios de un servicio solo la
       directa, el servicio de un usuario, sino añadir esto */
    /*,usuarios: {
			collection: 'usuario',
			via: 'servicio'
		}
    */
	}
};
