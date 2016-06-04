app.controller('customersCtrl', function($scope, $http, Page){
    Page.setTitle('Klienci');

    $scope.predicate = 'customerId';
    $scope.reverse = false;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };
    $scope.getClass = function(column){
        if(column === $scope.predicate){
            if($scope.reverse) return 'is-reverse';
            return 'is-active';
        }
        return null;
    }

    $http.get('http://localhost:8080/customer')
        .then(function(result){
            $scope.customers = result.data;
        });
});
