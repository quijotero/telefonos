//Servicios REST que llaman a la API de Sails via $resource

//Factoria para consumir entidad usuarios
app.factory("usuarioService", function ($resource) {
  return  {
    api:
    $resource("/usuario/:id", //la url donde queremos consumir
        //aquí podemos pasar variables que queramos pasar a la consulta
        {id: '@id',limit: '@limit',skip: '@skip',sort: '@orden'},
        {
             query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    ),
    //Funcion que permite mostrar los resultados en distintas páginas
    irPagina: function($scope,apiUsuarios,pagina,numeroRegistros,orden) {
      var saltarRegistros = (pagina -1) * numeroRegistros
      //llama a la API saltando determinados registros según la página
      apiUsuarios.api.get({limit: numeroRegistros,skip:  saltarRegistros,sort: orden })
        .$promise.then(function(data) {
          $scope.totalUsuarios =  data.total;
          $scope.usuarios = data.results;
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

/** Servicio que consulta la API en la ruta /loggedin para saber si el usuario
*   actual está autentificado. La API devuelve 0 si no lo está o un objeto con
*   varias propiedades si está autentificado.
*/
app.service('autentificadoService', ['$http', function($http) {
  var urlBase = '/loggedin';
  this.get= function() {
    return $http.get(urlBase);
  }
}]);
