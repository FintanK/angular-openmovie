openMovie.factory('OpenMovies', function($http) {
    return {
        get: function(searchTerm) {
            return $http({
                url: "http://www.omdbapi.com?t= " + searchTerm + " &y=&tomatoes=true&plot=full&r=json",
                method: "GET"
            });
        }
    }
});