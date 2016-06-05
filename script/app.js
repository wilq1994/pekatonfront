var app = angular.module('app', ['ngRoute', 'ngAnimate', 'chart.js']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/", { templateUrl: 'script/dashboard/dashboard.html', controller: 'dashboardCtrl' })
        .when("/customers", { templateUrl: 'script/customers/customers.html', controller: 'customersCtrl' })
        .when("/purchases", { templateUrl: 'script/orders/orders.html', controller: 'ordersCtrl' })
        .when("/products", { templateUrl: 'script/products/products.html', controller: 'productsCtrl' })
        .when("/socialmedia", { templateUrl: 'script/socialmedia/socialmedia.html', controller: 'socialmediaCtrl' })
        .when("/customers/:id", { templateUrl: 'script/customers/customer.html', controller: 'customerCtrl' })
        .otherwise('/');
}]);


app.factory('page', function() {
   var title = 'Dashboard';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
});


app.factory('customers', function($http){
    var customers = null;

    return {
        getAll: function(){
            return $http.get('http://localhost:8080/customer');
        },
        getById: function(id){
            return  $q(function(resolve, reject) {
                var result = null;

                $http.get('http://localhost:8080/customer').then(function(result){
                    console.log(result)
                    customers = result.data;
                    angular.forEach(customers, function(customer){
                        if(customer.customerId === parseInt(id)) result = customer;
                    });
                    resolve(result);
                });
            });
        }
    };
});


app.factory('customersPromising', function($http, $q){
    var customers = null;

    return {
        getAll: function(){
            return $http.get('http://localhost:8080/customer/promising');
        },
        getById: function(id){
            return  $q(function(resolve, reject) {
                var result = null;

                $http.get('http://localhost:8080/customer/promising').then(function(data){
                    customers = data.data;
                    angular.forEach(customers, function(node){
                        if(node.customer.customerId === parseInt(id)) result = node;
                    });
                    resolve(result);
                });
            });
        }
    };
});

app.factory('orders', function($http, $q){
    var purchases = null;

    return {
        getAll: function(){
            return $http.get('http://localhost:8080/purchase');
        },
        getById: function(id){
            return  $q(function(resolve, reject) {
                var result = null;

                $http.get('http://localhost:8080/purchase').then(function(data){
                    purchases = data.data;
                    angular.forEach(purchases, function(purchase){
                        if(purchase.purchaseId === parseInt(id)) result = node;
                    });
                    resolve(result);
                });
            });
        }
    };
});



app.controller('appCtrl', function($scope, $location, page){
    $scope.page = page;

    $scope.getClass = function(path){
        if($location.path() == path) {
            return 'is-active';
        }else{
            return ' ';
        }
    }
});
