app.controller('productsCtrl', function($scope, $http, page){
    page.setTitle('Products');

    $http.get('http://localhost:8080/product/recommend')
        .then(function(result){
            $scope.products = result.data;
        });

    $scope.predicate = 'product.productId';
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
    $scope.toggleDetails = function(id){
        var detail = angular.element(document.querySelectorAll(".c-table__details")[id]),
            detailRow = angular.element(document.querySelectorAll(".c-table__details")[id].querySelector('.l-row')),
            h = detailRow.prop('scrollHeight');

        if(detail.hasClass('is-active')){
            detailRow.css('height', '0px');
            detail.removeClass('is-active');
        }else{
            detailRow.css('height', h+'px');
            detail.addClass('is-active');
        }
    }
});
