var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/", { templateUrl: 'script/dashboard/dashboard.html', controller: 'dashboardCtrl' })
        .when("/statystyki", { templateUrl: 'script/dashboard/dashboard.html', controller: 'dashboardCtrl' })
        .otherwise('/');
}]);
