//Factoria para consumir entidad usuarios
//Llamamos a la API REST para obtener la lista de usuarios
app.factory("apiUsuarios", function ($resource) {
  console.debug("Recuperando datos de la API de usuarios...");
  return  $resource("/usuario/:id", //la url donde queremos consumir
        {id: '@id'}, //aquí podemos pasar variables que queramos pasar a la consulta
        //a la función get le decimos el método, y, si es un array lo que devuelve
        //ponemos isArray en true
        {
             query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
});
//Factoria para consumir la entidad departamento
app.factory("apiDepartamentos", function ($resource) {
  console.debug("Recuperando datos de la API de departamentos...");
  return  $resource("/departamento/:id", //la url donde queremos consumir
        {id: '@id'}, //aquí podemos pasar variables que queramos pasar a la consulta
        //a la función get le decimos el método, y, si es un array lo que devuelve
        //ponemos isArray en true
        {
             query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
});

//Factoria para consumir la entidad departamento
app.factory("apiServicios", function ($resource) {
  console.debug("Recuperando datos de la API de Servicios...");
  return  $resource("/servicio/:id", //la url donde queremos consumir
        {id: '@id'}, //aquí podemos pasar variables que queramos pasar a la consulta
        //a la función get le decimos el método, y, si es un array lo que devuelve
        //ponemos isArray en true
        {
             query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            delete: {method: 'DELETE'}
        }
    );
});
