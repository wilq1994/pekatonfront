app.controller('dashboardCtrl', function($scope, $http, Page){
    Page.setTitle('Dashboard');

    $scope.predicate = 'factor';
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
        if(ratio>1) return 'c-table__ratio1';
        else if(ratio>0.5) return 'c-table__ratio2';
        else if(ratio>0.4) return 'c-table__ratio3';
        else if(ratio>0.3) return 'c-table__ratio4';
        else if(ratio>0.2) return 'c-table__ratio5';
        else if(ratio<0.009) return 'c-table__ratio10';
        else if(ratio<0.09) return 'c-table__ratio9';
        else if(ratio<0.05) return 'c-table__ratio8';
        else if(ratio<0.9) return 'c-table__ratio7';
        else if(ratio<0) return 'c-table__ratio6';
    }

    $http.get('http://localhost:8080/customer/promising')
        .then(function(result){
            $scope.customers = result.data;
        });
});
