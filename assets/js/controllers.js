//Constructor del Controlador appController
//Es llamado cada vez que se recarga la página completamente
app.controller("appController", ["$scope","apiUsuarios", function($scope,apiUsuarios){
	//Recuperamos TODOS los usuarios llamando a la API rest con query()
	apiUsuarios.query().$promise.then(function(data){
			$scope.totalUsuarios =  data.total;
			$scope.usuarios = data.results;
			console.debug("Total usuarios recuperados:" + data.total);
	})
}]);

//Muestra toda la informacion del usuario
app.controller("infoController", ["$scope","$routeParams","apiUsuarios",
								function addController($scope,$routeParams,apiUsuarios){
	var idUsuario = $routeParams.id;
	apiUsuarios.get({id: idUsuario }).$promise.then(function(usuario) {
				$scope.usuario = usuario;
				console.debug("Usuario cargado:" + $scope.usuario.nombre);
	});
}]);

//creamos el controlador addController para guardar usuarios nuevos
app.controller("addController",[
					"$scope",
					"$location",
					"apiUsuarios",
					"apiDepartamentos",
					"apiServicios",
					function addController($scope,
																 $location,
																 apiUsuarios,
																 apiDepartamentos,
																 apiServicios){
	$scope.textButton = "Añadir un nuevo usuario";
	$scope.usuario = {};
	//Recuperamos TODOS los departamentos llamando a la API rest con query()
	apiDepartamentos.query().$promise.then(function(data){
			$scope.totalDepartamentos =  data.total;
			$scope.departamentos = data.results;
			console.debug("Total departamentos recuperados:" + data.total);
	});
	//Recuperamos TODOS los servicios llamando a la API rest con query()
	apiServicios.query().$promise.then(function(data){
			$scope.totalServicios =  data.total;
			$scope.servicios = data.results;
			console.debug("Total servicios recuperados:" + data.total);
	});
	$scope.newUser = function(){
 		//Para guardarlo con $resource llamando a la API
		var record = new apiUsuarios();
		record.nombre = $scope.usuario.nombre;
		record.apellidos = $scope.usuario.apellidos;
		record.telefono1 = $scope.usuario.telefono1;
		record.telefono2 = $scope.usuario.telefono2;
		record.departamento = $scope.usuario.departamento;
		record.servicio = $scope.usuario.servicio;
		record.$save(function() {
			console.debug("Nuevo usuario creado");
			$location.url("/");
		})
	}
}]);

app.controller("editController",
		["$scope","$location","$routeParams",
		 "apiUsuarios","apiDepartamentos","apiServicios",
		 function addController($scope,$location,$routeParams,
					apiUsuarios,apiDepartamentos,apiServicios){
	$scope.textButton = "Editar usuario";
	//obtenemos el usuario a editar con routeParams
	var idUsuario = $routeParams.id;
	//Cargamos en el formulario los datos del usuario llamando a la API
	apiUsuarios.get({id: idUsuario }).$promise.then(function(usuarioModificar) {
				$scope.usuario = usuarioModificar;
				console.debug("Usuario a modificar:" + $scope.usuario.nombre);
	});
	//Recuperamos TODOS los departamentos llamando a la API rest con query()
	apiDepartamentos.query().$promise.then(function(data){
			$scope.totalDepartamentos =  data.total;
			$scope.departamentos = data.results;
			console.debug("Total departamentos recuperados:" + data.total);
	});
	//Recuperamos TODOS los servicios llamando a la API rest con query()
	apiServicios.query().$promise.then(function(data){
			$scope.totalServicios =  data.total;
			$scope.servicios = data.results;
			console.debug("Total servicios recuperados:" + data.total);
	});

	$scope.editUser = function(){
		//Para guardarlo con $resource llamando a la API
		$scope.usuario.$update(function() {
			console.debug("Usuario actualizado");
			$location.url("/");
		})
	}
}]);

//eliminamos el usuario dependiendo de su id
app.controller("removeController", ["$scope","$location","$routeParams","apiUsuarios",
							function addController($scope,$location,$routeParams,apiUsuarios){
	$scope.removeUser = function(){
		var record = new apiUsuarios();
		record.id = $routeParams.id;
		record.$delete(function() {
			console.debug("Usuario eliminado");
			$location.url("/");
		})
	}
}]);
