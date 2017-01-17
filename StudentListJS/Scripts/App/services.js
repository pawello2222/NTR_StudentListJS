var studentService = function ($http) {
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
            data: [ID, student],
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
};

var groupService = function ($http) {
    var urlBase = 'api';

    this.getGroups = function () {
        return $http.get(urlBase + '/Groups');
    };

    this.getGroup = function (ID) {
        return $http({
            method: 'get',
            data: ID,
            url: urlBase + '/Groups/' + ID
        });
    };

    this.createGroup = function (group) {
        return $http({
            method: 'post',
            data: group,
            url: urlBase + '/Groups'
        });
    };

    this.updateGroup = function (ID, group) {
        return $http({
            method: 'put',
            data: group,
            url: urlBase + '/Groups/' + ID
        });
    };

    this.deleteGroup = function (ID) {
        return $http({
            method: 'delete',
            data: ID,
            url: urlBase + '/Groups/' + ID
        });
    };
};