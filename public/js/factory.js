(function(){
	
	//vamos criar a factory
	angular.module("app")
		.factory('RestAPI', ['$http', '$rootScope', function($http,$rootScope){
		
		

			//criar nossos métodos de interação com a API
			function createStudent(student,callback){

				//efetuamos a chamada na api
				$http
					.post("http://localhost:8080/api/students/",student)
					.success(function(data,status) {

						callback(data);
						$rootScope.$broadcast("StudentInserted",data);
					})
			}

			function removeStudent(id,callback){

				console.log('Sera');

				//efetuamos a chamada na api
				$http
					.delete("http://localhost:8080/api/students/" + id)
					.success(function(data,status) {
						console.log('OK');
						callback(data);
					})
			}

			function getAllStudents(callback){

				//efetuamos a chamada na api
				$http
					.get("http://localhost:8080/api/students/")
					.success(function(data,status) {
					
						callback(data);
					})
			}

			
			return {
				createStudent:createStudent,
				getAllStudents:getAllStudents,
				removeStudent:removeStudent
			}
	}])

})()