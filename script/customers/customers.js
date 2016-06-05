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
          elem.ready(function(){
              attrs.val = 0;
              attrs.max = elem.attr('data-int');

              function loop(){
                  attrs.val++;
                  elem.text(attrs.val);
                  if(attrs.val < attrs.max) $timeout(loop,200);
                  else elem.text(attrs.max);
              }

              $timeout(loop,500);
          })
       }
    };
});


app.directive('numberDouble', function($timeout) {
    return {
        link: function( $scope, elem, attrs) {
          elem.ready(function(){
              attrs.val = 0.00;
              attrs.max = elem.attr('data-double');

              function loop(){
                  attrs.val += attrs.max/100;
                  elem.text(attrs.val.toFixed(2));
                  if(attrs.val < attrs.max) $timeout(loop,10);
                  else elem.text(attrs.max);
              }

              $timeout(loop,500);
          })
       }
    };
});
