angular.module('starter.services', [])

.factory('theFactory', function theFactory($http) {
    return {
        getJson: function () {
            return $http({
                method: 'GET',
                url: 'https://graph.facebook.com/v2.8/me?access_token='
            });
        },
    };
});