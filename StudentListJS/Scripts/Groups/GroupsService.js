StudentsApp.factory('GroupsService', ['$http', function ($http) {

    var urlBase = 'api';
    var GroupsService = {};

    GroupsService.getGroups = function () {
        return $http.get(urlBase + '/Groups');
    };

    GroupsService.createGroup = function (group) {
        return $http({
            method: 'post',
            data: group,
            url: urlBase + '/Groups'
        });
    };

    GroupsService.editGroup = function (ID, group) {
        return $http({
            method: 'put',
            data: [ID, group],
            url: urlBase + '/Groups/' + ID
        });
    };

    GroupsService.deleteGroup = function (ID) {
        return $http({
            method: 'delete',
            data: ID,
            url: urlBase + '/Groups/' + ID
        });
    };

    return GroupsService;
}]);