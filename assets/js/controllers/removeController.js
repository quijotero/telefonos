//eliminamos el usuario dependiendo de su id
app.controller("removeController", ["$scope","idUsuario","usuarioService","$modalInstance",
							function removeController($scope,idUsuario,usuarioService,$modalInstance){
		//Funcíon que cierra la ventana modal borrando el usuario
	  $scope.ok = function () {
			var record = new usuarioService.api();
			record.id = idUsuario;
			record.$delete(function() {
				$modalInstance.close();
			})
	  };
		//Función que cierra la ventana modal sin borrar
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
}]);
