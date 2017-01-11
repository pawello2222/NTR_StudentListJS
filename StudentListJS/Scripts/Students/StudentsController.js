StudentsApp.controller('StudentsController', function ($scope, StudentsService) {

    getStudents();

    function getStudents() {
        StudentsService.getStudents()
            .success(function (students) {
                $scope.students = students;

            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;

            });
    }
});