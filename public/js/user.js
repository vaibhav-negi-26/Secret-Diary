var app = angular.module("myApp", []);

// login controller
app.controller("myLogin", function ($scope, $http, $log, $window) {

    $scope.email
    $scope.password
    $scope.login = function () {
        if ($scope.email === undefined || $scope.password === undefined) {
            return console.log("Email or password is empty.")
        }
        console.log($scope.email + " : " + $scope.password)
        const req = {
            method: 'POST',
            url: '/users/login',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }
        const successCallback = (response) => {
            const user = response.data.user
            const token = response.data.token
            localStorage.setItem("token", token);
            $window.location.href = '/home.html';
            // console.log(response.status)
            // $log.info(response)
        }
        const errorCallback = (response) => {
            alert("Wrong Email or Password")
            console.log("Wrong Email or Password")
            // console.log(response.status)
            // $log.info(response)
        }
        $http(req).then(successCallback, errorCallback)
    }

    // getting token form localstorage
    const token = localStorage.getItem("token");

    ///////////////////////////////////////////////////////////////// checking authentication
    const success = (response) => {
        $window.location.href = '/home.html'
        // console.log(response.status)
        // $log.info(response)
    }
    const error = (response) => {
        console.log('Please Login')
        // $log.info(response)
    }
    $http({
        method: 'GET',
        url: '/users/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(success, error)

});

// signup controller
app.controller("mySignUp", function ($scope, $http, $log, $window) {

    $scope.name
    $scope.email
    $scope.userpassword
    $scope.confirmpass
    const error_msg = $('#error_msg')

    const checker = function () {
        // console.log($scope.userpassword + " : " + $scope.confirmpass)
        if ($scope.userpassword === $scope.confirmpass) {
            error_msg.hide('slow')
            return true
        } else {
            error_msg.toggle('slow')
            $scope.userpassword = ''
            $scope.confirmpass = ''
            return false
        }
    }

    $scope.signup = function () {

        // checkig for empty field
        if ($scope.name === undefined || $scope.email === undefined || $scope.userpassword === undefined || $scope.confirmpass === undefined) {
            return console.log("Any Field is empty.")
        }
        // password checking
        if (!checker()) {
            return
        }
        // console.log($scope.name + " : " + $scope.email + " : " + $scope.userpassword)
        const req = {
            method: 'POST',
            url: '/users/create',
            data: {
                name: $scope.name,
                email: $scope.email,
                password: $scope.userpassword
            }
        }
        const successCallback = (response) => {
            const user = response.data.user
            const token = response.data.token
            localStorage.setItem("token", token);
            $window.location.href = '/home.html';
            // console.log(response.status)
            // $log.info(response)
        }
        const errorCallback = (response) => {
            console.log("Wrong Email or Password")
            // console.log(response.status)
            // $log.info(response)
        }
        $http(req).then(successCallback, errorCallback)
    }

});