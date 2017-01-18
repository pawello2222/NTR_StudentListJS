var appController = function ($scope, studentService, groupService) {

    $scope.showStudentListDiv = true;
    $scope.showStudentFormDiv = false;
    $scope.showGroupListDiv = false;
    $scope.showGroupFormDiv = false;

    getStudents();
    getGroups();
    $scope.status = "";

    $scope.showStudentsTab = function () {
        getStudents();
        $scope.showStudentListDiv = true;
        $scope.showStudentFormDiv = false;
        $scope.showGroupListDiv = false;
        $scope.showGroupFormDiv = false;
    }

    $scope.showGroupsTab = function () {
        getGroups();
        $scope.showStudentListDiv = false;
        $scope.showStudentFormDiv = false;
        $scope.showGroupListDiv = true;
        $scope.showGroupFormDiv = false;
    }

    function getStudents() {
        var getData = studentService.getStudents();
        getData.then(function (_students) {
            $scope.students = _students.data;
        }, function () {
            alert('Error getting all students.');
        });
    }

    $scope.createStudent = function () {
        clearStudentFields();
        $scope.Action = "Create";
        $scope.showStudentFormDiv = true;
    }

    $scope.editStudent = function (student) {
        var getData = studentService.getStudent(student.IDStudent);
        getData.then(function (_student) {
            $scope.student = _student.data;
            $scope.studentID = student.IDStudent;
            $scope.studentIndexNo = student.IndexNo;
            $scope.studentFirstName = student.FirstName;
            $scope.studentLastName = student.LastName;
            $scope.studentBirthDate = student.BirthDate;
            $scope.studentBirthPlace = student.BirthPlace;
            $scope.studentGroup = student.Group;
            $scope.Action = "Update";
            $scope.showStudentFormDiv = true;
        }, function () {
            alert('Error getting student.');
        });
    }

    $scope.saveStudent = function () {
        var Student = {
            FirstName: $scope.studentFirstName,
            LastName: $scope.studentLastName,
            IndexNo: $scope.studentIndexNo,
            BirthDate: $scope.studentBirthDate,
            BirthPlace: $scope.studentBirthPlace,
            Group: $scope.studentGroup
        };
        var getStudentAction = $scope.Action;

        if (getStudentAction == "Update") {
            Student.IDStudent = $scope.studentID;
            var getData = studentService.updateStudent(Student);
            getData.then(function () {
                getStudents();
                $scope.showStudentFormDiv = false;
            }, function () {
                alert('Error updating student.');
            });
        } else {
            var getData = studentService.createStudent(Student);
            getData.then(function () {
                getStudents();
                $scope.showStudentFormDiv = false;
            }, function () {
                alert('Error creating student.');
            });
        }
    }

    $scope.deleteStudent = function (student) {
        var getData = studentService.deleteStudent(student.IDStudent);
        getData.then(function () {
            getStudents();
        }, function () {
            alert('Error deleting student.');
        });
    }

    function clearStudentFields() {
        $scope.studentID = "";
        $scope.studentIndexNo = "";
        $scope.studentFirstName = "";
        $scope.studentLastName = "";
        $scope.studentBirthDate = "";
        $scope.studentBirthPlace = "";
        $scope.studentGroup = "";
    }

    $scope.cancelStudentForm = function () {
        $scope.showStudentFormDiv = false;
    };

    //---------------

    function getGroups() {
        var getData = groupService.getGroups();
        getData.then(function (_groups) {
            $scope.groups = _groups.data;
        }, function () {
            alert('Error getting all groups.');
        });
    }

    $scope.createGroup = function () {
        clearGroupFields();
        $scope.Action = "Create";
        $scope.showGroupListDiv = false;
        $scope.showGroupFormDiv = true;
    }

    $scope.editGroup = function (group) {
        var getData = groupService.getGroup(group.IDGroup);
        getData.then(function (_group) {
            $scope.group = _group.data;
            $scope.groupID = group.IDGroup;
            $scope.groupName = group.Name;
            $scope.Action = "Update";
            $scope.showGroupListDiv = false;
            $scope.showGroupFormDiv = true;
        }, function () {
            alert('Error getting group.');
        });
    }

    $scope.saveGroup = function () {
        var Group = {
            Name: $scope.groupName
        };
        var getGroupAction = $scope.Action;

        if (getGroupAction == "Update") {
            Group.IDGroup = $scope.groupID;
            var getData = groupService.updateGroup(Group.IDGroup, Group);
            getData.then(function () {
                getGroups();
                $scope.showGroupListDiv = true;
                $scope.showGroupFormDiv = false;
            }, function () {
                alert('Error updating group.');
            });
        } else {
            var getData = groupService.createGroup(Group);
            getData.then(function () {
                getGroups();
                $scope.showGroupListDiv = true;
                $scope.showGroupFormDiv = false;
            }, function () {
                alert('Error creating group.');
            });
        }
    }

    $scope.deleteGroup = function (group) {
        var getData = groupService.deleteGroup(group.IDGroup);
        getData.then(function () {
            getGroups();
        }, function () {
            alert('Error deleting group.');
        });
    }

    function clearGroupFields() {
        $scope.groupID = "";
        $scope.groupName = "";
    }

    $scope.cancelGroupForm = function () {
        $scope.showGroupListDiv = true;
        $scope.showGroupFormDiv = false;
    };
};
