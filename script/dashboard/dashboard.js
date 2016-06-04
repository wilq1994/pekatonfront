app.controller('dashboardCtrl', function($scope, $http, Page){
    Page.setTitle('Dashboard');

    $scope.predicate = 'customer.id';
    $scope.reverse = true;
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
    $scope.getColor = function(ratio){
        if(ratio>23) return 'c-table__ratio1';
        else if(ratio>22) return 'c-table__ratio2';
        else if(ratio>21) return 'c-table__ratio3';
        else if(ratio>20) return 'c-table__ratio4';
        else if(ratio>19) return 'c-table__ratio5';
        else if(ratio<11) return 'c-table__ratio10';
        else if(ratio<12) return 'c-table__ratio9';
        else if(ratio<13) return 'c-table__ratio8';
        else if(ratio<14) return 'c-table__ratio7';
        else if(ratio<15) return 'c-table__ratio6';
    }

    $http.get('http://localhost:8080/customer/promising')
        .then(function(result){
            $scope.customers = result.data;
        });
});
