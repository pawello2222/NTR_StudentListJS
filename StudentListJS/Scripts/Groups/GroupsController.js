StudentsApp.controller('GroupsController', function ($scope, GroupsService) {

    getGroups();

    function getGroups() {
        GroupsService.getGroups()
            .success(function (groups) {
                $scope.groups = groups;

            })
            .error(function (error) {
                $scope.status = 'Unable to load groups: ' + error.message;

            });
    }

    $scope.formGroupCreate = {};

    $scope.createGroup = function () {
    };

    $scope.editGroup = function (ID) {
    };

    $scope.deleteGroup = function (ID) {
        var dlt = GroupsService.deleteGroup(ID);
        dlt.then(function (d) {
            getGroups();
        }, function (error) {
            $scope.status = 'Unable to delete group: ' + error.message;
        })
    };
});