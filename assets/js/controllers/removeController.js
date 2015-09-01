//eliminamos el usuario dependiendo de su id
app.controller("removeController", ["$scope","idUsuario","usuarioService","$modalInstance","autentificadoService",
							function removeController($scope,idUsuario,usuarioService,$modalInstance,autentificadoService){

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
		//Funcíon que cierra la ventana modal borrando el usuario
	  $scope.ok = function () {
			var record = new usuarioService.api();
			record.id = idUsuario;
			record.$delete(function() {
				console.debug("Usuario eliminado de la bbdd");
				$modalInstance.close();
			})
	  };
		//Funcíon que cierra la ventana modal sin borrar
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	}
}]);
