/**
 * UsuarioController
 *
 * @description :: controlador de la entidad Usuario, tiene sobreescritas las funciones
					finOne() y find(), para añadir funcionalidad de filtrado en desde el servidor
 * 
 */
module.exports = {
_config: {
			actions: false,
			shortcuts: false,
			rest: true
		},
/**
	FUNCION findOne(), sobreescribe a la funcion del blueprint por defecto
		
	Responde a:	
	GET /Usuario/:id
	
	Devuelve un usuario concreto, con su departamento y servicio
		
 * Parametros:
 * @param {String} id		   - Devuelve un usuario concreto, el indicado por este parámetro
 * @return {JSON} objeto	   - devuelve un objeto JSON con las propiedades TOTAL (num. registros) y RESULT (datos)
*/
	findOne: function(req, res) {
		//Busca solo un usuario no la lista completa
		var id =  req.param("id");
		if ( id ) {			
			Usuario
				.findOne({id: id})
				.populate('departamento')
				.populate('servicio')	
				.exec(function(err, results) {				
				if(err) {
				  res.serverError(err);
				}
				res.json(results);
			})			
		}
	},

/**
	FUNCION find(), sobreescribe a la funcion del blueprint por defecto
		
	Responde a:	
	GET /Usuario
	
	Realiza un filtrado, ordenacion y paginación de la entidad Usuario por los parametros
	pasados en la URL, que pueden ser:
		
 * Parametros:
 * @param {String} filtro      - nombre por el que filtar los resultados
 * @param {Integer} limit      - limitacion de los registros devueltos, para paginación
 * @param {Integer} skip       - número de registros a saltar, para paginación
 * @param {String} sort        - campo por el que ordenar, hay que poner detras ASC/DES
 * @return {JSON} objeto	   - devuelve un objeto JSON con las propiedades TOTAL (num. registros) y RESULT (datos)
*/
	find: function (req, res) {	
		//Busca la lista completa
		var filtro   =req.param('filtro') || "";
		var limit    =req.param('limit') || 25; 
		var sort     =req.param('sort') || "";
		var skip     =req.param('skip') || 0;
		//Para poder filtar por cualquier parte del campo nombre y apellidos
		var where    = {or:[
							{'nombre':{'contains':filtro}},
							{'apellidos':{'contains':filtro}}	]}
		//Para elegir traer de vuelta sólo algunos campos
		var select   ={select: ['id','nombre', 'apellidos','telefono1','telefono2','departamento','servicio']}			
		//Consulta a realizar a la bbdd, con dos entidades relacionadas
		var query    =Usuario.find(select).sort(sort).limit(limit).skip(skip).where(where)
						.populate('departamento',{select: ['nombre']})
						.populate('servicio',{select: ['nombre']})		
		//Ejecuta la consulta
		query.exec(function(err, results) {
			if(err) {
			  res.serverError(err);
			}
			//Cuenta los resultados 
			Usuario.count(where).exec(function (error, count) {
				if (error) {
					return res.serverError(error);
				}
				var data = {};
				data.total = count;
				data.results = results;
				//Devuelve los resultados y su numero en un json
				res.json(data);
			});
		});						
	}				
};
