//Controlador de la pagina principal
app.controller('pruebaController', ['ProductsService', '$scope', function (ProductsService, $scope) {
	
	 $scope.moused = function(){console.log("moused over");}
	 
	 
	$scope.sort = [];
	$scope.pagination = {
		pageSize: 25,
		pageNumber: 1,
		totalItems: null,
		getTotalPages: function () {
			return Math.ceil(this.totalItems / this.pageSize);
		},
		nextPage: function () {
			if (this.pageNumber < this.getTotalPages()) {
				this.pageNumber++;
				$scope.load();
			}
		},
		previousPage: function () {
			if (this.pageNumber > 1) {
				this.pageNumber--;
				$scope.load();
			}
		}
	}
     $scope.gridOptions = {
        excludeProperties: '__metadata',
        enablePaginationControls: false,
        useExternalSorting: true,
		columnDefs:[
			{ field: 'nombre', displayName: 'Nombre', resizable: true ,
				cellTemplate: '<div ng-class="{green: row.getProperty(col.field) > 30}" ng-mouseover="moused()"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
			},
			{ field: 'apellidos', displayName: 'Apellidos', resizable:true },				
			{ field: 'telefono1', displayName: 'Teléfono 1' },
			{ field: 'telefono2', displayName: 'Telefono 2' },
			{ field: 'departamento.nombre', displayName: 'Departamento' },
			{ field: 'servicio.nombre', displayName: 'Servicio' },
		],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            //declare the events
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
              $scope.sort = [];
              angular.forEach(sortColumns, function(sortColumn) {
                //$scope.sort.push({fieldName: sortColumn.name, order: sortColumn.sort.direction});
				$scope.sort.push(sortColumn.name + " " + sortColumn.sort.direction);
              });             
              $scope.load();
            });
          }
    };
	

    $scope.load = function () {
		//console.log("ANTERIOR:" + "\npageSize:" + $scope.pagination.pageSize + 
		//			"\npageNumber:" + $scope.pagination.pageNumber + "\nSort:" + $scope.sort);
		if($scope.pagination.pageNumber >0 ) {
		ProductsService.readAll($scope.pagination.pageSize, $scope.pagination.pageNumber,$scope.sort).then(function (response) {
            $scope.gridOptions.data = response.results;
            $scope.pagination.totalItems = response.total;
        });       
		}
    }

    $scope.load();
	
	
}]);


app.service('ProductsService', ['$http', ProductsService]);
function ProductsService($http) {
	var self = this;
	var baseUrl = '/';	
	var objectName = 'usuario';
	var anonymousToken = '';	
	self.readAll = function (pageSize, pageNumber,sort) {
		var saltarRegistros = (pageNumber -1) * pageSize;
		console.log("\nsaltar:" + saltarRegistros + "\npageSize:" + pageSize + "\npageNumber:" + pageNumber);
		return $http({
			method: 'GET',
			url: baseUrl + objectName,
			params: {				
				limit: pageSize,
				skip: saltarRegistros,
				sort: sort
			},
			headers: anonymousToken
		}).then(function (response) {
			return response.data;
		});
		};
	self.readOne = function (id) {
		return $http({
			method: 'GET',
			url: baseUrl + objectName + '/' + id,
			headers: anonymousToken
		}).then(function (response) {
			return response.data;
		});
	};
	self.create = function (data) {
		return $http({
			method: 'POST',
			url: baseUrl + objectName,
			data: data,
			params: {
				returnObject: true
			},
			headers: anonymousToken
		}).then(function (response) {
			return response.data;
		});
	};
	self.update = function (id, data) {
		return $http({
			method: 'PUT',
			url: baseUrl + objectName + '/' + id,
			data: data,
			headers: anonymousToken
		}).then(function (response) {
			return response.data;
		});
	};
	self.delete = function (id) {
		return $http({
			method: 'DELETE',
			url: baseUrl + objectName + '/' + id,
			headers: anonymousToken
		});
	};
}

