angular.module("firebase.demo")
    .controller("SchedulerCtrl", function ($scope, SchedulerService) {
        $scope.initDate = function () {
            $('.input-group.date').datepicker({
                autoclose: true,
                todayHighlight: true
            });
            console.log('Init called');
            $('[data-toggle="tooltip"]').tooltip();
        };
        $scope.initTime = function () {
            $('#scheduled-time').timepicker();
            console.log('Timepicker called')
        };

        $scope.NewDateTime = {
            date: "",
            time: ""
        };

        $scope.tasksLoaded = false;
        var tasks = SchedulerService.Tasks;
        tasks.all().$loaded().then(function () {
            $scope.tasksLoaded = true;
            console.log('Loaded tasks');
        })

        $scope.all = all;
        $scope.delete = deleteInternal;
        $scope.update = update;
        $scope.add = add;
        $scope.total = total;

        function total(){
            return all().length;
        }

        function all() {
            return tasks.all();
        }

        function deleteInternal(id) {
            return tasks.remove(id);
        }

        function update(id) {
            return tasks.save(id);
        }

        function add(o) {
            o.date = $("#scheduled-date").val();
            o.time = $("#scheduled-time").val();
            console.log(o);
            tasks.add(o);
            resetModel(o);
        }

        function resetModel(o) {
            $("#scheduled-date").val("");
            $("#scheduled-time").val("");
        }
    })
