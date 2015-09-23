//Constructor del Controlador princpial de la pagina appController
//Es llamado cada vez que se recarga la página completamente
app.controller("appController", ["$scope","$location","autentificado","$modal","$rootScope",
    function($scope,$location,autentificado,$modal,$rootScope){
  // Funcion para comprobar la ruta activa y cambiar la pestaña correspondiente
  //en la barra de navegacion. Devuelve True si la ruta pasada coincide con la
  //ruta actual.
  $scope.isActive = function (viewLocation) {
         return viewLocation === $location.path();
     };

  //Para saber si el usuario está autentificado
  $scope.usuarioAutentificado = false;
  //Comprobamos que el usuario esté autentificado para poder añadir usuarios
  autentificado.get(function(usuario) {
    //Ponemos la variable a TRUE para que aparezcan los campos EDITAR/BORRAR
    //en la pagina cuando está autentificado el usuario
    $scope.usuarioAutentificado = true;
  }, function(data, status) {
    $scope.usuarioAutentificado = false;
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
