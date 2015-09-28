//Controlador de autentificacion del usuario
app.controller("loginController", ["$scope","$location","$http","$window",
  function($scope,$location,$http,$window){

  $scope.usuario = {};

  $scope.login = function(formularioValido){
    //Necesario cambiar a true para que compruebe el formulario sólo cuando ya
    //se ha enviado por lo menos una vez
    $scope.formularioEnviado = true;
    $scope.loginError = false;
    if(formularioValido)
    {
      //Aqui hay que ver si el usuario es correcto y si no redirigir a login      
      $http.post("/login",$scope.usuario)
         .success(function(data) {
           if (data.errors) {
             $scope.loginError = true;
             //Hay algún error en la consulta
             $location.url("/login");
           } else {
             //todo correcto, redirigir a inicio pero autentificado ya
            $scope.loginError = false;
             $window.location.href ="/";
           }
         })
         //Acceso denegado, error 401 normalmente
         .error(function(data) {
           $scope.loginError = true;
           $location.url("/login");
         });


    }
  //Funcion que comprueba si el formulario ya ha sido enviado y tiene ese campo
  //con un valor incorrecto, entonces devuelve TRUE, si todo es correcto FALSE
  $scope.campoIncorrecto = function (campo) {
    return  (campo.$invalid &&  $scope.formularioEnviado);
  }

  $scope.loginIncorrecto = function () {
    return  ( $scope.loginError &&  $scope.formularioEnviado);
  }
}
}]);
