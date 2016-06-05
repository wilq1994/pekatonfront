app.controller('socialmediaCtrl', function($scope, $http, page){
    page.setTitle('Social media');

    $http.get('http://localhost:8080/facebook/reviews')
        .then(function(result){
            $scope.reviews = result.data;
        });

    $http.get('http://localhost:8080/facebook/comments')
        .then(function(result){
            $scope.comments = result.data;
        });

    $scope.getStars = function(rate){
        return 'c-stars--'+rate;
    }
});
