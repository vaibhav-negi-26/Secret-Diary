var app = angular.module("myApp", []);

app.controller("myHome", function ($scope, $http, $log, $window) {
    const Str = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    })
    $scope.name = Str.name
    const token = localStorage.getItem("token");
    // console.log(token)

    const req = {
        method: 'GET',
        url: '/users/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }
    const successCallback = (response) => {
        console.log(response.data)
        // console.log(response.status)
        // $log.info(response)
    }
    const errorCallback = (response) => {
        console.log(response)
        // console.log(response.status)
        // $log.info(response)
    }
    $http(req).then(successCallback, errorCallback)
})