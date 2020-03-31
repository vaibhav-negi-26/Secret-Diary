var app = angular.module("myApp", []);

// login controller
app.controller("myLogin", function ($scope, $http, $log, $window) {

    $scope.email = 'admin@gmail.com'
    $scope.password = 'vaibhav@26'
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
            // console.log(user)
            const url = '/home.html?name=' + user.name + '&owner=' + user._id
            // console.log(url)
            $window.location.href = url;
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

// signup controller
app.controller("mySignUp", function ($scope, $http, $log, $window) {

    $scope.name = 'admin'
    $scope.email = 'abc@gmail.com'
    $scope.userpassword = 'admin@26'
    $scope.confirmpass = 'admin@26'
    const error_msg = $('#error_msg')

    const checker = function () {
        // console.log($scope.userpassword + " : " + $scope.confirmpass)
        if ($scope.userpassword === $scope.confirmpass) {
            error_msg.hide('slow')
            return true
        } else {
            error_msg.toggle('slow')
            pass.val('')
            confirm_pass.val('')
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
            const url = '/home.html?name=' + user.name + '&owner=' + user._id
            // console.log(url)
            localStorage.setItem("token", token);
            $window.location.href = url;
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