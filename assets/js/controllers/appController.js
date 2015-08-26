//Constructor del Controlador princpial de la pagina appController
//Es llamado cada vez que se recarga la página completamente
app.controller("appController", ["$scope","$location",
    function($scope,$location){
  // Funcion para comprobar la ruta activa y cambiar la pestaña correspondiente
  //en la barra de navegacion. Devuelve True si la ruta pasada coincide con la
  //ruta actual.
  $scope.isActive = function (viewLocation) {
        //console.debug("Ruta pasada:" + viewLocation);
        //console.debug("Ruta actual:" + $location.path());
         return viewLocation === $location.path();
     };
}]);
