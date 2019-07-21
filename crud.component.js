angular
    .module('CrudApp', ['ngMaterial', 'ngMessages'])
    .controller('DemoCtrl', function ($scope, $mdDialog) {

        var listController = this;
        listController.users = [];

        listController.add = function ($event) {
            $mdDialog.show({
                templateUrl: 'dialogbox/addDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                locals: { parent: $scope },
                controller: function ($scope, $mdDialog) {
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
        
                    $scope.answer = function (answer) {
                        $mdDialog.hide(answer);
                    };

                    $scope.today = new Date();
                }
            })
                .then(function (answer) {
                    listController.users.push({
                        firstname: answer.firstname,
                        lastname: answer.lastname,
                        birthdate: answer.birthdate,
                        description: answer.description
                        
                    });
                    listController.firstname = '';
                    listController.lastname = '';
                    listController.description = '';
                    listController.birthdate = '';
                });
        };

        listController.view = function ($event, obj) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialogbox/viewDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                locals: { index: obj },
            })
        };

        listController.delete = function ($event, obj) {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'listController',
                templateUrl: 'dialogbox/deleteDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                locals: { index: obj },
            })
                .then(function () {
                    listController.users.splice(obj, 1);
                });
        };

        listController.edit = function ($event, obj) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialogbox/editDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                locals: { index: obj },
            })
                .then(function (answer) {
                    listController.users[obj] = {
                        firstname : answer.firstname,
                        lastname : answer.lastname,
                        birthdate : answer.birthdate,
                        description : answer.description
                    };
                });
        };

        function DialogController($scope, index,  $mdDialog) {
            $scope.data = {
                firstname : listController.users[index].firstname,
                lastname : listController.users[index].lastname,
                birthdate : listController.users[index].birthdate,
                description : listController.users[index].description
            };

            $scope.today = new Date();
            
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

    });