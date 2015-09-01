//creamos nuestro modulo llamado app
var app = angular.module("app", ["ngResource","ngRoute","ui.bootstrap"]);

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
		controller : "addController"
	})
	.when("/edit/:id", {
		title: 'Editar usuario',
		templateUrl : "templates/edit.html",
		controller : "editController"
	})
	.when("/login", {
		title: 'Login usuario',
		templateUrl : "templates/login.html",
		controller : "loginController"
	})
 	.otherwise({ redirectTo : "/"})
})
