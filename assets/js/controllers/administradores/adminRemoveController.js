//eliminamos el usuario dependiendo de su id
app.controller("adminRemoveController", ["$scope","idUsuario","accesoService","$modalInstance",
							function removeController($scope,idUsuario,accesoService,$modalInstance){
		//Funcíon que cierra la ventana modal borrando el usuario
	  $scope.ok = function () {
			var record = new accesoService.api();
			record.id = idUsuario;
			record.$delete(function() {
				$modalInstance.close();
			})
	  };
		//Funcíon que cierra la ventana modal sin borrar
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
}]);
