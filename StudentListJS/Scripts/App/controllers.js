var appController = function ($scope, studentService, groupService) {
    
    getStudents();
    getGroups();
    $scope.status = "";

    $scope.showStudentListDiv = true;
    $scope.showStudentFormDiv = false;
    $scope.showGroupListDiv = false;
    $scope.showGroupFormDiv = false;

    $scope.currentPageStudents = 0;
    $scope.pageSizeStudents = 5;
    $scope.numberOfPagesStudents = function () {
        return Math.ceil($scope.students.length / $scope.pageSizeStudents);
    };

    $scope.currentPageGroups = 0;
    $scope.pageSizeGroups = 5;
    $scope.numberOfPagesGroups = function () {
        return Math.ceil($scope.groups.length / $scope.pageSizeGroups);
    };

    $scope.showStudentsTab = function () {
        getStudents();
        $scope.showStudentListDiv = true;
        $scope.showStudentFormDiv = false;
        $scope.showGroupListDiv = false;
        $scope.showGroupFormDiv = false;

        $scope.currentPageStudents = 0;
     }

    $scope.showGroupsTab = function () {
        getGroups();
        $scope.showStudentListDiv = false;
        $scope.showStudentFormDiv = false;
        $scope.showGroupListDiv = true;
        $scope.showGroupFormDiv = false;

        $scope.currentPageGroups = 0;
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
        getStudents();
        clearStudentFields();
        $scope.Action = "Create";
        $scope.showStudentFormDiv = true;
    }

    $scope.editStudent = function (student) {
        getStudents();
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
            $scope.studentStamp = student.Stamp;
            $scope.Action = "Edit";
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
            IDGroup: $scope.studentGroup.IDGroup
        };

        var getOldData = studentService.getStudent($scope.studentID);
        getOldData.then(function (_oldStudent) {

            var getStudentAction = $scope.Action;

            if (getStudentAction == "Edit" && $scope.studentStamp != _oldStudent.data.Stamp) {
                alert('Error updating student - record was modified.');
                return;
            }

            if (getStudentAction == "Edit") {
                Student.IDStudent = $scope.studentID;
                var getData = studentService.updateStudent(Student.IDStudent, Student);
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

        }, function () {
            alert('Error getting student.');
        });
    }

    $scope.deleteStudent = function (student) {
        var delConfirm = confirm("Are you sure?");
        if (delConfirm == true) {
            var getData = studentService.deleteStudent(student.IDStudent);
            getData.then(function () {
                getStudents();
            }, function () {
                alert('Error deleting student.');
            });
        }
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
        getStudents();
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
        getGroups();
        clearGroupFields();
        $scope.Action = "Create";
        $scope.showGroupListDiv = false;
        $scope.showGroupFormDiv = true;
    }

    $scope.editGroup = function (group) {
        getGroups();
        var getData = groupService.getGroup(group.IDGroup);
        getData.then(function (_group) {
            $scope.group = _group.data;
            $scope.groupID = group.IDGroup;
            $scope.groupName = group.Name;
            $scope.groupStamp = group.Stamp;
            $scope.Action = "Edit";
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
        var getOldData = groupService.getGroup($scope.groupID);
        getOldData.then(function (_oldGroup) {
            
            var getGroupAction = $scope.Action;

            if (getGroupAction == "Edit" && $scope.groupStamp != _oldGroup.data.Stamp) {
                alert('Error updating group - record was modified.');
                return;
            }

            if (getGroupAction == "Edit") {
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

        }, function () {
            alert('Error getting group.');
        });
    }

    $scope.deleteGroup = function (group) {
        var delConfirm = confirm("Are you sure?"); 
        if (delConfirm == true) {
            var getData = groupService.deleteGroup(group.IDGroup);
            getData.then(function () {
                getGroups();
            }, function () {
                alert('Error deleting group.');
            });
        }
    }

    function clearGroupFields() {
        $scope.groupID = "";
        $scope.groupName = "";
    }

    $scope.cancelGroupForm = function () {
        getGroups();
        $scope.showGroupListDiv = true;
        $scope.showGroupFormDiv = false;
    };
};
