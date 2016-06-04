app.controller('customersCtrl', function($scope, $http, page, customers){
    page.setTitle('Klienci');

    customers.getAll().then(function(result){
        $scope.customers = result.data;
    });

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
});

app.controller('customerCtrl', function($scope, $routeParams, page, customersPromising){
    page.setTitle('Klient');

    customersPromising.getById($routeParams.id).then(function(customer){
        $scope.customer = customer;
    });
});
