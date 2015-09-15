//Muestra la ventana acerca De
app.controller("acercadeController", ["$scope","$modalInstance",
							function removeController($scope,$modalInstance){
		//Funcíon que cierra la ventana modal borrando el usuario
	  $scope.ok = function () {
				$modalInstance.close();
	  };		
}]);
