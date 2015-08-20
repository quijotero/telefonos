//creamos el controlador addController para guardar usuarios nuevos
app.controller("addController",[
	"$scope","$location","usuarioService","departamentoService","servicioService",
	function addController($scope,$location,usuarioService,departamentoService,
												servicioService){
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
	$scope.newUser = function(){
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
}]);
