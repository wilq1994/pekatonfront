var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/", { templateUrl: 'script/dashboard/dashboard.html', controller: 'dashboardCtrl' })
        .when("/klienci", { templateUrl: 'script/customers/customers.html', controller: 'customersCtrl' })
        .when("/zamowienia", { templateUrl: 'script/orders/orders.html', controller: 'ordersCtrl' })
        .otherwise('/');
}]);

app.factory('Page', function() {
   var title = 'Dashboard';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
});

app.controller('appCtrl', function($scope, $location, Page){
    $scope.Page = Page;
    $scope.getClass = function(path){
        if($location.path() == path) {
            return 'is-active';
        }else{
            return ' ';
        }
    }
});
