var app = angular.module("myApp", []);

app.filter('myFormat', function () {
    return function (x) {
        var date = x.split('T')
        var time = date[1].split('.')
        var time = date[0] + ' at ' + time[0]
        return time;
    };
});

app.controller("myHome", function ($scope, $http, $log, $window) {

    // jquery
    var main_diary = $('.main_diary')
    var footer = $('.footer')
    var loader = $('.wrapper')

    // getting token form localstorage
    const token = localStorage.getItem("token");

    ///////////////////////////////////////////////////////////////// checking authentication
    const success = (response) => {
        $scope.name = response.data.name
        // console.log(response.status)
        // $log.info(response)
    }
    const error = (response) => {
        console.log(response)
        if (response.status === 401) {
            $window.location.href = '/'
        }
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

    ///////////////////////////////////////////////////////////////// request for all sequels
    const successCallback = (response) => {
        $scope.sequels = response.data
        loader.fadeOut('slow')
        main_diary.fadeIn('slow')
        footer.fadeIn('slow')
        // console.log(response.status)
        // $log.info(response)
    }
    const errorCallback = (response) => {
        console.log(response)
        if (response.status === 401) {
            $window.location.href = '/'
        }
        // $log.info(response)
    }
    $http({
        method: 'GET',
        url: '/sequel/all',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(successCallback, errorCallback)

    ///////////////////////////////////////////////////////////////// signout function
    $scope.signout = () => {
        loader.fadeIn()
        const successCallback = (response) => {
            console.log(response.data)
            localStorage.removeItem("token");
            $window.location.href = '/'
            // $log.info(response)
        }
        const errorCallback = (response) => {
            console.log(response)
            // console.log(response.status)
            // $log.info(response)
        }
        $http({
            method: 'POST',
            url: '/users/logout',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(successCallback, errorCallback)
    }
    ///////////////////////////////////////////////////////////////// delete a squel
    $scope.delete = (id) => {
        const s = (response) => {
            console.log(response)
            $window.location.reload();
            // console.log(response.status)
            // $log.info(response)
        }
        const e = (response) => {
            console.log(response)
            if (response.status !== 200) {
                $log.info(response)
            }
        }
        $http({
            method: 'DELETE',
            url: '/sequel/' + id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(s, e)
    }
    ///////////////////////////////////////////////////////////////// delete a squel
    $scope.view = (id) => {
        $window.location.href = '/diary_view.html?q=' + id
    }
});

app.controller('diaryNew', function ($scope, $http, $log, $window) {

    // jquery
    var main_diary = $('.main_diary_2')
    var footer = $('.footer')
    var loader = $('.wrapper')
    // getting token form localstorage
    const token = localStorage.getItem("token");

    ///////////////////////////////////////////////////////////////// checking authentication
    const successCallback = (response) => {
        loader.fadeOut('slow')
        main_diary.fadeIn('slow')
        footer.fadeIn('slow')
        // console.log(response.status)
        // $log.info(response)
    }
    const errorCallback = (response) => {
        console.log(response)
        if (response.status === 401) {
            $window.location.href = '/'
        }
        // $log.info(response)
    }
    $http({
        method: 'GET',
        url: '/users/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(successCallback, errorCallback)

    ///////////////////////////////////////////////////////////////// signout function
    $scope.signout = () => {
        loader.fadeIn('fast')
        main_diary.toggle()
        footer.toggle()
        const successCallback = (response) => {
            localStorage.removeItem("token");
            $window.location.href = '/'
            // $log.info(response)
        }
        const errorCallback = (response) => {
            console.log(response)
            // console.log(response.status)
            // $log.info(response)
        }
        $http({
            method: 'POST',
            url: '/users/logout',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(successCallback, errorCallback)
    }
    ///////////////////////////////////////////////////////////////// save function
    $scope.save = () => {
        const successCallback = (response) => {
            console.log(response)
            $window.location.href = '/home.html'
            // $log.info(response)
        }
        const errorCallback = (response) => {
            // console.log(response)
            // console.log(response.status)
            $log.info(response)
        }
        $http({
            method: 'POST',
            url: '/sequel/create',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            data: {
                title: $scope.title,
                content: $scope.content
            }
        }).then(successCallback, errorCallback)
    }
});

app.controller('diaryView', function ($scope, $http, $log, $window) {
    // jquery
    var main_diary = $('.main_diary_2')
    var footer = $('.footer')
    var loader = $('.wrapper')
    // getting token form localstorage
    const token = localStorage.getItem("token");

    //Query Parameters 
    const {q} = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    })


    ///////////////////////////////////////////////////////////////// checking authentication
    const s = (response) => {
        loader.fadeOut('slow')
        main_diary.fadeIn('slow')
        footer.fadeIn('slow')
        getSequle(q)
        // console.log(response.status)
        // $log.info(response)
    }
    const e = (response) => {
        console.log(response)
        if (response.status === 401) {
            $window.location.href = '/'
        }
        // $log.info(response)
    }
    $http({
        method: 'GET',
        url: '/users/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(s, e)

    ///////////////////////////////////////////////////////////////// finding seule by id
    const getSequle = (id) => {
        const success = (response) => {
            $scope.title = response.data.title
            $scope.content = response.data.content
            // console.log(response.status)
            // $log.info(response)
        }
        const error = (response) => {
            console.log(response)
            if (response.status !== 200) {
                $log.info(response)   
            }
        }
        $http({
            method: 'GET',
            url: '/sequel/'+id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(success, error)
    }
    ///////////////////////////////////////////////////////////////// save function
    $scope.update = () => {
        const successCallback = (response) => {
            console.log(response)
            $window.location.href = '/home.html'
            // $log.info(response)
        }
        const errorCallback = (response) => {
            // console.log(response)
            // console.log(response.status)
            $log.info(response)
        }
        $http({
            method: 'PATCH',
            url: '/sequel/'+q,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            data: {
                title: $scope.title,
                content: $scope.content
            }
        }).then(successCallback, errorCallback)
    }
});