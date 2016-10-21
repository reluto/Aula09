(function () {
	//criamos nosso app
	var app = angular.module("app",[]);
	//vamos criar nossa controller para o envio do dado no rest
	app.controller("FormCtrl",["$scope","RestAPI",function ($scope, RestAPI) {
		$scope.scoreLength = [];
		$scope.scoreChange = function(value) {
			if(value === 1){
				$scope.scoreLength.push($scope.scoreLength.length);
			}else{
				$scope.scoreLength.push($scope.scoreLength.length);
			}
		}

	}])
	//controller do result
	app.controller('ResultCtrl', ['$scope',"RestAPI", function($scope, RestAPI){
		
	}])

	//vamos criar a factory
	app.factory('RestAPI', ['$rootScope','$http', function($rootScope,$http){
		
		function getAlunoByQuery(query) {
			
			$http
			    .get('http://localhost:3000/aluno/'+ query.name, {
			        params: query
			     })
			     .success(function (data,status) {
			     	  console.log(data);
			          $rootScope.$broadcast("GetAluno",data)
			     });
		}

		return {
			getAlunoByQuery:getAlunoByQuery
		}
	}])


})()