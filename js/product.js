angular.module("firebase.demo")
    .controller("ProductCtrl", function ($scope, ProductService) {
        /* Global variable declaration */
        $scope.itemloaded = false;
        $scope.ProductError = {
            error: false,
            text: ''
        };
        $scope.NewItem = {
            name: "",
            approvedBy: "",
            checkedIn: false
        };

        /* Load Product Service */
        var products = ProductService.Products;

        /* Controller's helper function declarations */
        $scope.all = all;
        $scope.save = save;
        $scope.delete = deleteInternal;
        $scope.insert = insert;

        /**
         * Call the $loaded function of firebase class
         * When the data is loaded set itemloaded to
         * true to indicate the progress bar to end
         */
        products.all().$loaded().then(function () {
            $scope.itemloaded = true;
        });

        /**
         * Sets data into ProductError object
         * @param flag - boolean value indicating if its an error or not
         * @param text - the error message
         */
        function propagateError(flag, text) {
            $scope.ProductError.error = flag;
            $scope.ProductError.text = text;
        }

        /**
         * Resets the model that holds the product information
         */
        function resetModel() {
            $scope.NewItem.name = "";
            $scope.NewItem.approvedBy = "";
            $scope.NewItem.checkedIn = false;
        }

        /**
         * Returns all products
         * @returns {*|Promise|{options}}
         */
        function all() {
            return products.all();
        }

        /**
         * Saves the product object to the firebase database
         * @param id - the unique firbase id to save to
         */
        function save(id) {
            products.save(id)
        }

        /**
         * Deletes the product object from firebase
         * @param id - the id to delete
         */
        function deleteInternal(id) {
            products.delete(id);
        }

        /**
         * Inserts a product object to firebase
         * Returns true if the item was successfully added to
         * firebase else false
         * @param newitem - the new item object.
         * @returns {boolean}
         */
        function insert(newitem) {
            if ((newitem.name.trim() == "") && (newitem.approvedBy.trim() == "")) {
                propagateError(true, "Name or approved by can not be empty");
                return false;
            }
            if (newitem.name.trim() == "") {
                propagateError(true, "Name can not be empty");
                return false;
            }
            if (newitem.approvedBy.trim() == "") {
                propagateError(true, "Approved by can not be empty");
                return false;
            }
            products.insert(newitem);
            resetModel();
            propagateError(false, "");
            return true;
        }
    });
