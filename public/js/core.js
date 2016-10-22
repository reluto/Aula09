(function () {
	//criamos nosso app
	var app = angular.module("app",[]);
	//vamos criar nossa controller para o envio do dado no rest
	app.controller("FormCtrl",["$scope","RestAPI",function ($scope, RestAPI) {

		$scope.student = {};
		$scope.student.score = [];
		$scope.scoreLength = [];

		$scope.scoreChange = function(value) {
			
			if(value == 1){
				var length = $scope.scoreLength.length;
				$scope.scoreLength.push(length);
			}else{
				$scope.student.score.pop();
				$scope.scoreLength.pop();
			}
		}
		$scope.addStudent = function(student) {
	
			RestAPI.createStudent(student,function(result) {
				console.log(result);
			})
		}
	}])
	//controller do result
	app.controller('ResultCtrl', ['$scope',"RestAPI", function($scope, RestAPI){
		
		
		$scope.students = [];

		$scope.delStudent = function(id) {
	
			RestAPI.removeStudent(id,function(result) {
				updateStudents();
			})			
		}
		
		function updateStudents(){
			RestAPI.getAllStudents(function (students) {
				$scope.students = students;
			})
		}
		
		$scope.$on("StudentInserted",updateStudents);

		updateStudents();

		

	}])

})()