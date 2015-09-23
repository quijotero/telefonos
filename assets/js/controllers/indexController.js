//Controlador de la pagina principal
app.controller("indexController", ["$scope","usuarioService","$modal",
	function($scope,usuarioService,$modal){
				
		//Para paginar la tabla cuando hay muchos registros
		$scope.registrosPorPagina = 25;
		$scope.paginaActual = 1;
		/*
		for (var prop in data){
			console.log("data." + prop + "=" + data[prop]);	
		}*/		
		$scope.filtrar = function() {
			console.log("filtrando por " + $scope.filtro);			
			usuarioService.irPagina($scope.paginaActual,$scope.registrosPorPagina,"apellidos ASC",$scope.filtro)
			.then(function (data) {
				$scope.totalUsuarios =  data.total;
				$scope.usuarios = data.results;
			});		
		}
		
		usuarioService.irPagina($scope.paginaActual,$scope.registrosPorPagina,"apellidos ASC")
			.then(function (data) {
				$scope.totalUsuarios =  data.total;
				$scope.usuarios = data.results;
			});		
		
		//Funcion llamada al cambiar de pagina el usuario
		$scope.cambioPagina = function() {
			usuarioService.irPagina($scope.paginaActual,$scope.registrosPorPagina,"apellidos ASC")
			.then(function (data) {
				$scope.totalUsuarios =  data.total;
				$scope.usuarios = data.results;
			});
		};
	  
	
		//Funcion que abre una ventana modal con información extra del usuario
		$scope.infoUsuarioOpen = function (idUsuario) {
			//Devuelve el obj que controla la ventana
			var infoUsuario = $modal.open({
				animation: true,
				templateUrl: 'templates/info.html',
				controller: 'infoController',
				//Para pasar parámetros al controlador infoController
				resolve: {
					idUsuario: function () {
						return idUsuario;
					}
				}
			});
			//Promesa que espera el cierre de la ventana
			infoUsuario.result.then(function () {
				//Cerrada pulsado Cerrar
			}, function () {
				//Cerrada pulsado Cancelar
			});
		};
		//Funcion que abre una ventana modal con confirmación del borrado
		$scope.removeUsuarioOpen = function (idUsuario) {
			//Devuelve el obj que controla la ventana
			var removeUsuario = $modal.open({
				animation: true,
				templateUrl: 'templates/remove.html',
				controller: 'removeController',
				//Para pasar parámetros al controlador removeController
				resolve: {
					idUsuario: function () {
						return idUsuario;
					}
				}
			});
			//Promesa que espera el cierre de la ventana para saber qué se seleccionó
			removeUsuario.result.then(function () {
				//Cerrada pulsado Borrar
				//Refrescamos la tabla en la pagina actual
				usuarioService.irPagina($scope.paginaActual,$scope.registrosPorPagina,"apellidos ASC")
				.then(function (data) {
					$scope.totalUsuarios =  data.total;
					$scope.usuarios = data.results;
				});	
			}, function () {
				//Cerrada pulsado Cancelar
			});
		};

}]);
