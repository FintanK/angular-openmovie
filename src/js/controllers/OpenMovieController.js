'use strict';

openMovie.controller('OpenMovieController', function($scope, $http, OpenMovies){
    $scope.searchTerm = "";
    $scope.searchmovie = false;
    $scope.spinner = false;
    $scope.search = function()
    {
        $scope.spinner = true;
        OpenMovies.get($scope.searchTerm)
            .success(function(data) {

                $scope.searchmovie = true;

                $scope.result = data;

                if(data['Response'] == 'False')
                {
                    $scope.error = data['Error'];
                }

                $scope.spinner = false;
            });
    }
});