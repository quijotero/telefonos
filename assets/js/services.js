//Servicios REST que llaman a la API de Sails via $resource


//Factoria para consumir entidad usuarios
app.factory("usuarioService",['$resource', function ($resource) {
  return  {
    api:
    $resource("/usuario/:id", //la url donde queremos consumir
        //aquí podemos pasar variables que queramos pasar a la consulta
        {id: '@id',limit: '@limit',skip: '@skip',sort: '@orden',filtro: '@filtro'},
        {
             query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    ),
	irPagina: function(pagina,numeroRegistros,orden,filtro) {
      var saltarRegistros = (pagina -1) * numeroRegistros
      //llama a la API saltando determinados registros según la página, devuelve la promesa
       return this.api.get({limit: numeroRegistros,skip:  saltarRegistros,sort: orden,filtro:filtro })
        .$promise.then(function(data) {
			//devuelve los datos
			return data;
        });		
    }	
  }
}]);

//Factoria para consumir la entidad departamento
app.factory("departamentoService",['$resource', function ($resource) {
  return  {
    api:
    $resource("/departamento/:id", //la url donde queremos consumir
        {id: '@id'}, //aquí podemos pasar variables que queramos pasar a la consulta
        {
             query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    )
  }
}]);

//Factoria para consumir la entidad departamento
app.factory("servicioService",['$resource', function ($resource) {
  return {
    api:
    $resource("/servicio/:id", //la url donde queremos consumir
        {id: '@id'}, //aquí podemos pasar variables que queramos pasar a la consulta
        {
             query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    )
  }
}]);

//Factoria para consumir la entidad acceso
app.factory("accesoService", ['$resource', function ($resource) {
  return  {
    api:
    $resource("/acceso/:id", //la url donde queremos consumir
        {id: '@id'}, //aquí podemos pasar variables que queramos pasar a la consulta
        {
             query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    )
  }
}]);

/** Provider que consulta la API en la ruta /loggedin para saber si el usuario
*   actual está autentificado. La API devuelve error 401 si no lo está o
*   un objeto con varias propiedades si está autentificado. Tambien puede
*   devolver 0 si hay algún problema con el usuario. 
*	Es llamada esta función desde appController.js para comprobar si se muestran
*   o no los botones de edicion/borrado, devuelve una promesa.
*/
app.factory('autentificado', function($q, $http,$location) {
	return {
		get: function() {
  
		  var deferred = $q.defer();
		  //Llamada AJAX para comprobar si está autentificado
			$http.get('/loggedin')
			  .success(function(user){
				  //Autentificado
				  if (user !== '0') {
					deferred.resolve();
				  }
				  // No autentificado
				  else {
					deferred.reject();
					$location.url('/login');
				  }
			//Error en la llamada AJAX,p.j. codigo 401
			}).error(function(user) {
				deferred.reject();
				$location.url('/login');
			});
		  return deferred.promise;
		}
	}
});

/** Factoria que comprueba si se puede entrar en la consola de administracion
* antes de cargar la página para evitar flick(), hay que activar primero
* la opción en "policies.js" y poner el controlador a TRUE
* Devuelve una promesa correcta o no, es usada desde app.js para no cargar
* la ruta si no está activada la administración, y también se usa desde 
* appController.js para activar o no la opción correspondiente en la barra superior
*/
app.factory('esAdmin', function($q, $http,$location) {
	return {
		get: function() {
  
		  var deferred = $q.defer();
		  //Llamada AJAX para comprobar si está autentificado
			$http.get('/acceso')
			  .success(function(user){
				  //Autentificado
				  if (user !== '0') {
					deferred.resolve();
				  }
				  // No autentificado
				  else {
					deferred.reject();
					$location.url('/');
				  }
			//Error en la llamada AJAX,p.j. codigo 401
			}).error(function(user) {
				deferred.reject();
				$location.url('/');
			});
		  return deferred.promise;
		}
	}
});

