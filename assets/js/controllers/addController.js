//creamos el controlador addController para guardar usuarios nuevos
app.controller("addController",[
	"$scope","$location","usuarioService","departamentoService","servicioService","autentificadoService",
	function addController($scope,$location,usuarioService,departamentoService,
												servicioService,autentificadoService){

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

		$scope.textButton = "Añadir un nuevo usuario";
		$scope.usuario = {};
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
		//Funcion que crea un usuario nuevo en la bbdd via API Rest
		$scope.crearUsuario = function(formularioValido){
			$scope.formularioEnviado = true;
			if(formularioValido)
			{
		 		//Para guardarlo con $resource llamando a la API
				var record = new usuarioService.api();
				record.nombre = $scope.usuario.nombre;
				record.apellidos = $scope.usuario.apellidos;
				record.telefono1 = $scope.usuario.telefono1;
				record.telefono2 = $scope.usuario.telefono2;
				record.correo    = $scope.usuario.correo;
				record.sede      = $scope.usuario.sede;
				record.departamento = $scope.usuario.departamento;
				record.servicio = $scope.usuario.servicio;
				record.$save(function() {
					console.debug("Nuevo usuario creado");
					$location.url("/");
				})
			}
		}
		//Funcion que comprueba si el formulario ya ha sido enviado y tiene ese campo
		//con un valor incorrecto, entonces devuelve TRUE, si todo es correcto FALSE
		$scope.campoIncorrecto = function (campo) {
			return  (campo.$invalid &&  $scope.formularioEnviado);
		}

	}; //fin funcion cargarPagina()
}]);
