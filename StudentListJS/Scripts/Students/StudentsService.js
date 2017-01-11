StudentsApp.factory('StudentsService', ['$http', function ($http) {

    var urlBase = 'http://localhost:62461/api';
    var StudentsService = {};
    StudentsService.getStudents = function () {
        return $http.get(urlBase + '/Students');
    };

    return StudentsService;
}]);