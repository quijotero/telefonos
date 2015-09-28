//creamos nuestro modulo llamado app
var app = angular.module("app", ["ngResource","ngRoute","ui.bootstrap","angular-loading-bar"]);

//hacemos el ruteo de nuestra aplicación
app.config(function($routeProvider, $locationProvider, $httpProvider){
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
			loggedin: function(autentificado) {
							return autentificado.get()
						}		
		}
	})
	.when("/edit/:id", {
		title: 'Editar usuario',
		templateUrl : "templates/edit.html",
		controller : "editController",
		//Para que no cargue la pagina si no está autentificado antes
		resolve: {
			loggedin: function(autentificado) {
							return autentificado.get()
						}
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
			checkAdmin: function(esAdmin) {
							return esAdmin.get()
						}
		}
	})	
 	.otherwise({ redirectTo : "/"})
})
