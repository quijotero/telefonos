//Servicios REST que llaman a la API de Sails via $resource


//Factoria para consumir entidad usuarios
app.factory("usuarioService", function ($resource) {
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
});

//Factoria para consumir la entidad departamento
app.factory("departamentoService", function ($resource) {
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
});

//Factoria para consumir la entidad departamento
app.factory("servicioService", function ($resource) {
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
});

//Factoria para consumir la entidad acceso
app.factory("accesoService", function ($resource) {
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
});

/** Provider que consulta la API en la ruta /loggedin para saber si el usuario
*   actual está autentificado. La API devuelve error 401 si no lo está o
*   un objeto con varias propiedades si está autentificado. Tambien puede
*   devolver 0 si hay algún problema con el usuario. Para usarla llamar a la
*   funcion pasándole dos funciones como parametros: Ok() y Error()
*/
function autentificadoProvider() {
  this.$get=['$http',function($http) {
    return new autentificado($http);
  }];
}
function autentificado($http) {
  this.get=function(fnOK,fnError) {
        $http({
          method: 'GET',
          url: "/loggedin"
        }).success(function(data, status, headers, config) {
            if(data == 0) { //problema con el usuario autentificado
              fnError(data,status);
            }
            else {
              fnOK(data);
            }
        }).error(function(data, status, headers, config) {
            //no ha podido recuperar la informacion del servidor,error 401
            fnError(data,status);
        });
      }
}
app.provider("autentificado",autentificadoProvider);
