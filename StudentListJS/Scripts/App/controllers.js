app.controller("appCtrl", function ($scope, appService) {
    $scope.showDivDetails = false;

    getStudents();
    $scope.status = "ASD";

    function getStudents() {
        var getData = appService.getBooks();
        getData.then(function (_students) {
            $scope.students = _students.data;
        }, function () {
            alert('Error in getting all student records');
        });
    }

    $scope.createStudent = function () {
        clearFields();
        $scope.Action = "Create";
        $scope.showDivDetails = true;
    }

    $scope.editStudent = function (student) {
        var getData = appService.getStudent(student.IDStudent);
        getData.then(function (_student) {
            $scope.student = _student.data;
            $scope.studentID = student.IDStudent;
            $scope.studentIndexNo = student.IndexNo;
            $scope.studentFirstName = student.FirstName;
            $scope.studentLastName = student.LastName;
            $scope.studentBirthPlace = student.BirthPlace;
            $scope.Action = "Update";
            $scope.showDivDetails = true;
        }, function () {
            alert('Error in getting single student records');
        });
    }

    $scope.saveStudent = function () {
        var Student = {
            FirstName: $scope.studentFirstName,
            LastName: $scope.studentLastName,
            IndexNo: $scope.studentIndexNo,
            BirthPlace: $scope.studentBirthPlace
        };
        var getStudentAction = $scope.Action;

        if (getStudentAction == "Update") {
            Student.IDStudent = $scope.studentID;
            var getData = appService.updateStudent(Student);
            getData.then(function (msg) {
                getStudents();
                alert(msg.data);
                $scope.showDivDetails = false;
            }, function () {
                alert('Error in updating student record');
            });
        } else {
            var getData = appService.createStudent(Student);
            getData.then(function (msg) {
                getStudents();
                alert(msg.data);
                $scope.showDivDetails = false;
            }, function () {
                alert('Error in creating student record');
            });
        }
    }

    $scope.deleteStudent = function (student) {
        var getData = appService.deleteStudent(student.IDStudent);
        getData.then(function (msg) {
            alert(msg.data);
            getStudents();
        }, function () {
            alert('Error in deleting book record');
        });
    }

    function clearFields() {
        $scope.studentID = "";
        $scope.studentIndexNo = "";
        $scope.studentFirstName = "";
        $scope.studentLastName = "";
        $scope.studentBirthPlace = "";
    }

    $scope.Cancel = function () {
        $scope.showDivDetails = false;
    };
});