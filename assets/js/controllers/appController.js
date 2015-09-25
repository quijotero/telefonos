//Constructor del Controlador princpial de la pagina appController
//Es llamado cada vez que se recarga la página completamente
app.controller("appController", ["$scope","$location","autentificado","$modal","$rootScope","esAdmin",
    function($scope,$location,autentificado,$modal,$rootScope,esAdmin){
  // Funcion para comprobar la ruta activa y cambiar la pestaña correspondiente
  //en la barra de navegacion. Devuelve True si la ruta pasada coincide con la
  //ruta actual.
  $scope.isActive = function (viewLocation) {
         return viewLocation === $location.path();
     };

  //Para saber si el usuario está autentificado
  $scope.usuarioAutentificado = false;
  //Para saber si está activada la administración de usuarios
  $scope.usuarioAdmin = false;
  //Comprobamos que el usuario esté autentificado para poder añadir usuarios  
  autentificado.get().then(function() {
	$scope.usuarioAutentificado = true;  
  }, function(data, status) {
	$scope.usuarioAutentificado = false;
  });
  
  //Comprobamos que la administracion de usuarios está activa para que se muestre
  //la opción correspondiente en la barra superior
  esAdmin.get().then(function() { 
	$scope.usuarioAdmin = true;  
  }, function(data, status) {
	$scope.usuarioAdmin = false;
  });

  //Funcion que abre una ventana modal con acercaDe
  $scope.acercadeOpen = function (idUsuario) {
    //Devuelve el obj que controla la ventana
    var acercaDe = $modal.open({
      animation: true,
      templateUrl: 'templates/acercade.html',
      controller: 'acercadeController'
    });
  }
    

}]);
