StudentsApp.factory('StudentsService', ['$http', function ($http) {

    var urlBase = 'http://localhost:62461/api';
    var StudentsService = {};

    StudentsService.getStudents = function () {
        return $http.get(urlBase + '/Students');
    };

    StudentsService.createStudent = function (student) {
        return $http({
            method: 'post',
            data: student,
            url: urlBase + '/Students'
        });
    };

    StudentsService.editStudent = function (ID, student) {
        return $http({
            method: 'put',
            data: [ ID, student ],
            url: urlBase + '/Students/' + ID
        });
    };

    StudentsService.deleteStudent = function (ID) {
        return $http({
            method: 'delete',
            data: ID,
            url: urlBase + '/Students/' + ID
        });
    };

    return StudentsService;
}]);