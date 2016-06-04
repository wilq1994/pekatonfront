app.controller('productsCtrl', function($scope, $http, page){
    page.setTitle('Produkty');

    $http.get('http://localhost:8080/product')
        .then(function(result){
            $scope.products = result.data;
        });

    $scope.predicate = 'productId';
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
