StudentsApp.controller('StudentsController', function ($scope, StudentsService) {

    getStudents();

    function getStudents() {
        StudentsService.getStudents()
            .success(function (students) {
                $scope.students = students;

            })
            .error(function (error) {
                $scope.status = 'Unable to load students: ' + error.message;

            });
    }

    $scope.formStudentCreate = {};

    $scope.createStudent = function () {
        $scope.nameRequired = '';
        $scope.emailRequired = '';
        $scope.passwordRequired = '';

        if (!$scope.formStudentCreate.Name) {
            $scope.nameRequired = 'Name Required';
        }

        if (!$scope.formStudentCreate.Email) {
            $scope.emailRequired = 'Email Required';
        }

        if (!$scope.formStudentCreate.Password) {
            $scope.passwordRequired = 'Password Required';
        }

        var student = {
            MailID: $scope.mailid,
            SubscribedDate: new Date()
        }

        var create = StudentsService.createStudent(student);
        create.then(function (d) {
            getStudents();
        }, function (error) {
            $scope.status = 'Unable to create student: ' + error.message;
        })
    };

    $scope.editStudent = function (ID) {
        var student = {
            MailID: $scope.mailid,
            SubscribedDate: new Date()
        }

        var edit = StudentsService.editStudent(ID, student);
        edit.then(function (d) {
            getStudents();
        }, function (error) {
            $scope.status = 'Unable to edit student: ' + error.message;
        })
    };

    $scope.deleteStudent = function (ID) {
        var dlt = StudentsService.deleteStudent(ID);
        dlt.then(function (d) {
            getStudents();
        }, function (error) {
            $scope.status = 'Unable to delete student: ' + error.message;
        })
    };
});