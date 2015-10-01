//Controlador de la pagina principal
app.controller("adminController", ["$scope","accesoService","$modal",
	function($scope,accesoService,$modal){

		//Para que no visualice el mensaje de error
		var crearUsuarioError=false;

		//Recuperamos TODOS los administradores llamando a la API rest con query()
		accesoService.api.query().$promise.then(function(data){
				$scope.totalUsuarios =  data.total;
				$scope.usuarios = data.results;
		});

		//Funcion que abre una ventana modal con confirmación del borrado
		$scope.removeUsuarioOpen = function (idUsuario) {
			//Devuelve el obj que controla la ventana
			var removeUsuario = $modal.open({
				animation: true,
				templateUrl: 'templates/administradores/remove.html',
				controller: 'adminRemoveController',
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
				accesoService.api.query().$promise.then(function(data){
						$scope.totalUsuarios =  data.total;
						$scope.usuarios = data.results;
				});
			}, function () {
				//Cerrada pulsado Cancelar
			});
		};

		//Funcion que crea un usuario nuevo en la bbdd via API Rest
		$scope.crearUsuario = function(formularioValido){
			$scope.formularioEnviado = true;
			if(formularioValido)
			{
		 		//Para guardarlo con $resource llamando a la API
				var record = new accesoService.api();
				record.nombre = $scope.usuario.nombre;
				record.password = $scope.usuario.password;
				record.$save(function() {
					crearUsuarioError=false;
					//Refrescamos la tabla para visualizar el nuevo usuario
					accesoService.api.query().$promise.then(function(data){
							$scope.totalUsuarios =  data.total;
							$scope.usuarios = data.results;
					});
				},function() {
					crearUsuarioError=true;
				})
			}
		}
		//Funcion que comprueba si el formulario ya ha sido enviado y tiene ese campo
		//con un valor incorrecto, entonces devuelve TRUE, si todo es correcto FALSE
		$scope.campoIncorrecto = function (campo) {
			return  (campo.$invalid &&  $scope.formularioEnviado);
		}

		$scope.crearUsuarioIncorrecto = function () {
			return  ( crearUsuarioError &&  $scope.formularioEnviado);
		}

}]);
