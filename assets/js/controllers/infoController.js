//Creamos el controlador para la ventana modal con informacion extra del usuario
app.controller('infoController',[
					"$scope",
					"$modalInstance",
					"idUsuario",
					"usuarioService",
 					function infoController($scope,
						 											$modalInstance,
																	idUsuario,
																	usuarioService) {
	//Recupera de la API de la bbdd toda la información del usuario
	usuarioService.api.get({id: idUsuario }).$promise.then(function(usuario) {
				$scope.usuario = usuario;
				console.debug("Usuario cargado:" + $scope.usuario.nombre);
	});
	//Funcíon que cierra la ventana modal
  $scope.ok = function () {
    $modalInstance.close();
  };
}]);
