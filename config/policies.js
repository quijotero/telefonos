/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

	'*': false,

	'UsuarioController': {
		'create': 'isAuthenticated',
		'update': 'isAuthenticated',
		'destroy': 'isAuthenticated',
		'remove': 'isAuthenticated',
		'add': 'isAuthenticated',
		'find': true,
		'findOne': true		
	},
	'DepartamentoController': {
		'create': 'isAuthenticated',
		'update': 'isAuthenticated',
		'destroy': 'isAuthenticated',
		'remove': 'isAuthenticated',
		'add': 'isAuthenticated',
		'find': true,
		'findOne': true
	},
	'ServicioController': {
		'create': 'isAuthenticated',
		'update': 'isAuthenticated',
		'destroy': 'isAuthenticated',
		'remove': 'isAuthenticated',
		'add': 'isAuthenticated',
		'find': true,
		'findOne': true
	},
	'AuthController': {
		'login': true,
		'logout': true,
		'loggedin': true
	},
	'AccesoController': {
		//Cambiar a FALSE para no permitir crear usuarios administradores, que pueden
		//borrar o crear nuevos usuarios del listin telefonico
		'*': false
	},

};
