app.controller("editController",
		["$scope","$location","$routeParams",
		 "usuarioService","departamentoService","servicioService","autentificadoService",
		 function editController($scope,$location,$routeParams,
					usuarioService,departamentoService,servicioService,autentificadoService){

	//Comprobamos que el usuario esté autentificado para poder añadir usuarios
	autentificadoService.get()
	.success(function (usuarioAutentificado) {
		if(usuarioAutentificado == 0) {
			errorPagina("Usuario no Autentificado");
		}
		else {
			cargarPagina(usuarioAutentificado);
		}
	})
	.error(function() { //401 no autorizado
			errorPagina("Error 401, no autorizado el usuario");
	});

	//Lo que ocurre cuando el usuario no está autentificado
	var errorPagina= function(mensaje) {
		console.log(mensaje);
		$location.url("/login");
	}

	//Lo que occurre al estar correctamente autentificado
	var cargarPagina= function(usuarioAutentificado) {
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

		$scope.editarUsuario = function(formularioValido){
			$scope.formularioEnviado = true;
			if(formularioValido)
			{
				//Para guardarlo con $resource llamando a la API
				$scope.usuario.$update(function() {
					console.debug("Usuario actualizado");
					$location.url("/");
				})
			}
		}

		//Funcion que comprueba si el formulario ya ha sido enviado y tiene ese campo
		//con un valor incorrecto, entonces devuelve TRUE, si todo es correcto FALSE
		$scope.campoIncorrecto = function (campo) {
			return  (campo.$invalid &&  $scope.formularioEnviado);
		}
} //fin funcion cargarPagina()

}]);
