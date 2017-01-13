app.service("appService", function ($http) {
    var urlBase = 'api';

    this.getStudents = function () {
        return $http.get(urlBase + '/Students');
    };

    this.getStudent = function (ID) {
        return $http({
            method: 'get',
            data: ID,
            url: urlBase + '/Students/' + ID
        });
    };

    this.createStudent = function (student) {
        return $http({
            method: 'post',
            data: student,
            url: urlBase + '/Students'
        });
    };

    this.updateStudent = function (ID, student) {
        return $http({
            method: 'put',
            data: [ ID, student ],
            url: urlBase + '/Students/' + ID
        });
    };

    this.deleteStudent = function (ID) {
        return $http({
            method: 'delete',
            data: ID,
            url: urlBase + '/Students/' + ID
        });
    };
});