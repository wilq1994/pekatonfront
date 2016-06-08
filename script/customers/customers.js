app.controller('customersCtrl', function($scope, $http, $location, page, customers){
    page.setTitle('Customers');

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
    $scope.go = function ( path ) {
      $location.path( path );
    };
});

app.controller('customerCtrl', function($scope, $routeParams, page, customersPromising){
    page.setTitle('Customer');

    customersPromising.getById($routeParams.id).then(function(customer){
        $scope.customer = customer;
    });

});

app.directive('numberInt', function($timeout) {
    return {
        link: function( $scope, elem, attrs ) {
            return $scope.$watch(attrs.number, function(newVal, oldVal) {
                if (oldVal == null) {
                  oldVal = 0;
                }
                if ((newVal != null) && newVal !== oldVal) {
                    var val = 0;
                    var max = newVal;

                    function loop(){
                        val += Math.ceil(max/3);
                        elem.text(val);
                        if(val < max) $timeout(loop,150);
                        else elem.text(max);
                    }

                    $timeout(loop,500);
                }
            });
        }
    };
});


app.directive('numberDouble', function($timeout) {
    return {
        link: function( $scope, elem, attrs) {
            return $scope.$watch(attrs.number, function(newVal, oldVal) {
                if (newVal) {
                    var val = 0.00;
                    var max = newVal;

                    function loop(){
                        val += max/100;
                        elem.text(val.toFixed(2));
                        if(val < max) $timeout(loop,10);
                        else elem.text(max);
                    }

                    $timeout(loop,500);
                }
            });
       }
    };
});
