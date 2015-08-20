app.controller("editController",
		["$scope","$location","$routeParams",
		 "usuarioService","departamentoService","servicioService",
		 function editController($scope,$location,$routeParams,
					usuarioService,departamentoService,servicioService){
	$scope.textButton = "Editar usuario";
	//obtenemos el usuario a editar con routeParams
	var idUsuario = $routeParams.id;
	//Cargamos en el formulario los datos del usuario llamando a la API
	usuarioService.api.get({id: idUsuario }).$promise.then(function(usuarioModificar) {
				$scope.usuario = usuarioModificar;
				console.debug("Usuario a modificar:" + $scope.usuario.nombre);
	});
	//Recuperamos TODOS los departamentos llamando a la API rest con query()
	departamentoService.api.query().$promise.then(function(data){
			$scope.totalDepartamentos =  data.total;
			$scope.departamentos = data.results;
			console.debug("Total departamentos recuperados:" + data.total);
	});
	//Recuperamos TODOS los servicios llamando a la API rest con query()
	servicioService.api.query().$promise.then(function(data){
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
