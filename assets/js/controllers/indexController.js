//Controlador de la pagina principal
app.controller("indexController", ["$scope","usuarioService","$modal",
	function($scope,usuarioService,$modal){
				
		//Para paginar la tabla cuando hay muchos registros
		$scope.registrosPorPagina = 25;
		$scope.paginaActual = 1;
		//Crea el objeto ordenacion y establece orden por defecto
		var ordenacion = {
					campo: "apellidos",
					direccion:"ASC",
					toString: function() {
						return this.campo + " " + this.direccion;
					}
		}
		$scope.nombre = "";
		$scope.apellidos ="ASC";
		/*
		for (var prop in data){
			console.log("data." + prop + "=" + data[prop]);	
		}*/		
		usuarioService.irPagina($scope.paginaActual,$scope.registrosPorPagina,ordenacion.toString(),$scope.filtro)
			.then(function (data) {
				$scope.totalUsuarios =  data.total;
				$scope.usuarios = data.results;
			});		

		//--------------------------------------------------
		// FUNCIONES DEL CONTROLADOR
		//--------------------------------------------------	
		//Función para ordenar	al hacer clic sobre un campo de la tabla	
		$scope.ordenar = function(campoOrdenar) {
			//TODO ********************
			//hay que cambiar $scope.nombre y apellidos segun se haga click
			if(campoOrdenar=="nombre") {
				switch($scope.nombre) {
					case "":
						$scope.nombre="ASC";
						break;
					case "ASC":
						$scope.nombre="DESC";
						break;
					case "DESC":
						$scope.nombre="ASC";
						break;
				}
				ordenacion.direccion=$scope.nombre;
				ordenacion.campo = campoOrdenar;
				$scope.apellidos="";
			}
			else {
				switch($scope.apellidos) {
					case "":
						$scope.apellidos="ASC";
						break;
					case "ASC":
						$scope.apellidos="DESC";
						break;
					case "DESC":
						$scope.apellidos="ASC";
				}
				ordenacion.direccion=$scope.apellidos;
				ordenacion.campo = campoOrdenar;
				$scope.nombre="";
			}
				
			//Refresca los campos para mostrar el nuevo orden
			usuarioService.irPagina($scope.paginaActual,$scope.registrosPorPagina,ordenacion.toString(),$scope.filtro)
			.then(function (data) {
				$scope.totalUsuarios =  data.total;
				$scope.usuarios = data.results;
			});	
		}
			
		//Funcion llamada al cambiar de pagina el usuario
		$scope.recargar = function() {
			usuarioService.irPagina($scope.paginaActual,$scope.registrosPorPagina,ordenacion.toString(),$scope.filtro)
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
				usuarioService.irPagina($scope.paginaActual,$scope.registrosPorPagina,ordenacion.toString(),$scope.filtro)
				.then(function (data) {
					$scope.totalUsuarios =  data.total;
					$scope.usuarios = data.results;
				});	
			}, function () {
				//Cerrada pulsado Cancelar
			});
		};

}]);
