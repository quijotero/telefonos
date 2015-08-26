//Controlador de autentificacion del usuario
app.controller("loginController", ["$scope","$location",function($scope,$location){

  $scope.login = function(formularioValido){
    $scope.usuario = {};
    $scope.formularioEnviado = true;
    if(formularioValido)
    {
      $location.url("/");
    }
  //Funcion que comprueba si el formulario ya ha sido enviado y tiene ese campo
  //con un valor incorrecto, entonces devuelve TRUE, si todo es correcto FALSE
  $scope.campoIncorrecto = function (campo) {
    return  (campo.$invalid &&  $scope.formularioEnviado);
  }
}
}]);
