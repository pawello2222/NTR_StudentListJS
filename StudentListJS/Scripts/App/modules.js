var app = angular.module('app', []);

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

app.controller('appController', appController);
app.service('studentService', studentService);
app.service('groupService', groupService);