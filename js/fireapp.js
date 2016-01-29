angular.module("firebase.demo", ["firebase", "ngRoute"])
    .constant("firebaseGlaringTorchURL", "https://glaring-torch-6739.firebaseio.com/")
    .factory('ProductService', function ($firebaseArray, firebaseGlaringTorchURL) {
        var f = {};
        var ref = new Firebase(firebaseGlaringTorchURL);
        var products = $firebaseArray(ref.child('products'));

        f.Products = {
            all: function () {
                return products;
            },
            save: function (id) {
                products.$save(id);
            },
            delete: function (id) {
                products.$remove(id)
            },
            insert: function (newitem) {
                products.$add({
                    name: newitem.name,
                    approvedBy: newitem.approvedBy,
                    checkedIn: newitem.checkedIn
                });
            }
        };
        return f;
    })
    .factory("SchedulerService", function ($firebaseArray, firebaseGlaringTorchURL) {
        var f = {}
        var ref = new Firebase(firebaseGlaringTorchURL);
        var tasks = $firebaseArray(ref.child('tasks'));
        f.Tasks = {
            all: function () {
                return tasks;
            },
            save: function (id) {
                return tasks.$save(id);
            },
            add: function (o) {
                return tasks.$add(o)
            },
            remove: function (id) {
                return tasks.$remove(id);
            },
            find: function (id) {
                return tasks.$getRecord(id);
            }
        }
        return f;
    })
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: 'templates/products/index.html',
                    controller: 'ProductCtrl'
                })
                .when("/scheduler", {
                    templateUrl: 'templates/scheduler/index.html',
                    controller: 'SchedulerCtrl'
                })
        }
    ]);