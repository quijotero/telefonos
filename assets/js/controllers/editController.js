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
		});
		//Recuperamos TODOS los departamentos llamando a la API rest con query()
		departamentoService.api.query().$promise.then(function(data){
				$scope.totalDepartamentos =  data.total;
				$scope.departamentos = data.results;
		});
		//Recuperamos TODOS los servicios llamando a la API rest con query()
		servicioService.api.query().$promise.then(function(data){
				$scope.totalServicios =  data.total;
				$scope.servicios = data.results;
		});

		$scope.editarUsuario = function(formularioValido){
			$scope.formularioEnviado = true;
			if(formularioValido)
			{
				//Para guardarlo con $resource llamando a la API
				$scope.usuario.$update(function() {
					$location.url("/");
				})
			}
		}

		//Funcion que comprueba si el formulario ya ha sido enviado y tiene ese campo
		//con un valor incorrecto, entonces devuelve TRUE, si todo es correcto FALSE
		$scope.campoIncorrecto = function (campo) {
			return  (campo.$invalid &&  $scope.formularioEnviado);
		}

}]);
