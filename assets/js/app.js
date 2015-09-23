//creamos nuestro modulo llamado app
var app = angular.module("app", ["ngResource","ngRoute","ui.bootstrap","angular-loading-bar","ui.grid"]);

//hacemos el ruteo de nuestra aplicación
app.config(function($routeProvider, $locationProvider, $httpProvider){

	//================================================
  // Función que comprueba si el usuario está logeado
	// antes de cargar la página para evitar flick()
	//Devuelve una promesa correcta o no
  //================================================
  var checkLoggedin = function($q, $http, $location){
    // Inicia una promesa
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
  };

  //================================================
  // Función que comprueba si se puede entrar en la consola de administracion
  // antes de cargar la página para evitar flick(), hay que activar primero
  //la opción en "policies.js" y poner el controlador a TRUE
  //Devuelve una promesa correcta o no
  //================================================
  var checkAdministrador = function($q, $http, $location){
    // Inicia una promesa
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
  };

	//================================================
	//RUTEO DE LA APLICACION
	//================================================
	$routeProvider.when("/", {
		templateUrl : "templates/index.html",
		controller : "indexController"
	})
	//esta es la forma de decirle a angular que vamos a pasar una variable por la url
	.when("/add", {
		title: 'Añadir usuario',
		templateUrl : "templates/add.html",
		controller : "addController",
		//Para que no cargue la pagina si no está autentificado antes
		resolve: {
			loggedin: checkLoggedin
		}
	})
	.when("/edit/:id", {
		title: 'Editar usuario',
		templateUrl : "templates/edit.html",
		controller : "editController",
		//Para que no cargue la pagina si no está autentificado antes
		resolve: {
			loggedin: checkLoggedin
		}
	})
	.when("/login", {
		title: 'Login usuario',
		templateUrl : "templates/login.html",
		controller : "loginController"
	})
	.when("/admin", {
		title: 'Administración',
		templateUrl : "templates/administradores/admin.html",
		controller : "adminController",
		//Para que no cargue la pagina si no está activado el controlador antes
		resolve: {
			checkAdmin: checkAdministrador
		}
	})
	.when("/prueba", {
		title: 'Prueba',
		templateUrl : "templates/prueba.html",
		controller : "pruebaController"
	})
 	.otherwise({ redirectTo : "/"})
})
