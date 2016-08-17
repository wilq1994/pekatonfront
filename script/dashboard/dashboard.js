app.controller('dashboardCtrl', function($scope, $http, $location, page){
    page.setTitle('Dashboard');

    $scope.go = function ( path ) {
      $location.path( path );
    };
});

app.controller('customerPromisingCtrl', function($scope, $http, customersPromising, colorService){
    customersPromising.getAll()
        .then(function(result){
            $scope.customers = result.data;
        });

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
       return colorService.getColor(ratio);
    }
});

app.controller('popularProductsCtrl', function($scope, $http, colorService){
    $http.get('http://localhost:8080/product/popular')
        .then(function(result){
            $scope.popularProducts = result.data;
        });

    $scope.predicate = '';
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
    };

    $scope.getColor = function(product){
        var ratio = (1 / $scope.popularProducts.indexOf(product));
        return colorService.getColor(ratio);
    };

});

app.controller('purchaseChartCtrl', function($scope, $http){

    $http.get('http://localhost:8080/purchase/statistics').then(function(data){
        $scope.current = 'counter';
        $scope.dates = [];
        $scope.counter = [];
        $scope.productCounter = [];
        $scope.value = [];

        angular.forEach(data.data, function(el,id){
            $scope.dates.push(el.purchaseDate);
            $scope.counter.push(el.counter);
            $scope.productCounter.push(el.productCounter);
            $scope.value.push(el.value);
        });
        $scope.labels = $scope.dates;
        $scope.data = [$scope['counter']];
    });

    $scope.change = function(category){
        $scope.current = category;
        $scope.data = [$scope[category]];
    }

    $scope.getClass = function(category){
        return ($scope.current === category)? 'is-active' : null;
    }
});


app.controller('entryChartCtrl', function($scope, $http){
    $http.get('http://localhost:8080/entry/statistics').then(function(data){
        $scope.current = 'counter';
        $scope.dates = [];
        $scope.counter = [];
        $scope.activeUsers = [];
        $scope.averageEntryTime = [];

        angular.forEach(data.data, function(el,id){
            $scope.dates.push(el.entryDate);
            $scope.counter.push(el.counter);
            $scope.activeUsers.push(el.activeUsers);
            $scope.averageEntryTime.push(el.averageEntryTime);
        });
        $scope.labels = $scope.dates;
        $scope.data = [$scope['counter']];
    });

    $scope.change = function(category){
        $scope.current = category;
        $scope.data = [$scope[category]];
    }

    $scope.getClass = function(category){
        return ($scope.current === category)? 'is-active' : null;
    }
});


app.controller('genderChartCtrl', function($scope, $http){
    $http.get('http://localhost:8080/customer/statistics').then(function(data){
        $scope.labels = ["Dupa2", "Dupa","Female", "Male"];
        $scope.data = [0,0];

        angular.forEach(data.data, function(el){
            $scope.data.push(el);
        });
    });
});


app.controller('likesChartCtrl', function($scope, $http){
    $http.get('http://localhost:8080/facebook/likes').then(function(data){
        $scope.days = [];
        $scope.likes = [];

        angular.forEach(data.data, function(el,id){
            $scope.days.push(el.day);
            $scope.likes.push(el.likes);
        });


        $scope.labels = $scope.days;
        $scope.data = [$scope.likes];
    });
});


app.controller('postcodeMapCtrl', function($scope, $http){
    $http.get('http://localhost:8080/purchase/postcode').then(function(data){
        angular.forEach(data.data, function(el,id){
            angular.element(document.querySelector('#'+el.district)).addClass('postcodeMap--'+(5-id));
        });
    });
});

app.service('colorService', function() {
   this.getColor = function(ratio) {
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
    };
});