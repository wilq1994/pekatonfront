app.controller('ordersCtrl', function($scope, page, orders){
    page.setTitle('Purchases');

    $scope.predicate = 'purchaseId';
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

    orders.getAll().then(function(orders){
        $scope.purchases = orders.data;
    });
});
