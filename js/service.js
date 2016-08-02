app
.service('Location', function($q, $http) {
    var obj = {};
    obj = {
        selectCity: function() {
            var defer = $q.defer();
            var cityData = firebase.database().ref('city');
            cityData.on('value', function(data) {
                defer.resolve(data.val());
            });
            // $http.get('data/address.json').success(function(response) {
            //     defer.resolve(response.city);
            // });
            return defer.promise;
        },
        selectZoneByCity: function(cityId) {
            var defer = $q.defer();
            var zoneData = firebase.database().ref('zone/' + cityId);
            zoneData.on('value', function(data) {
                defer.resolve(data.val());
            });
            // $http.get('data/address.json').success(function(response) {
            //     defer.resolve(response.zone[cityId]);
            // });
            return defer.promise;
        },
        selectLocationByZone: function(cityId, zoneId) {
            var defer = $q.defer();
            var locationData = firebase.database().ref('location/' + cityId + '/')
                               .orderByChild(zoneId).equalTo(zoneId);
            locationData.on('value', function(data) {
                defer.resolve(data.val());
            });
            // $http.get('data/address.json').success(function(response) {
            //     var temp=[];
            //     console.log(response.location[cityId]);
            //     angular.forEach(response.location[cityId], function(data) {
            //         if(data.zoneId === zoneId) {
            //             temp.push(data);
            //         }
            //     });
            //     console.log(temp);
            //     // console.log(response.location[cityId]);
            //     defer.resolve(temp);
            // });
            return defer.promise;
        },
        selectLocationByCity: function(cityId) {
            var defer = $q.defer();
            var locationData = firebase.database().ref('location/' + cityId);
            locationData.on('value', function(data) {
                console.log(data.val());
                defer.resolve(data.val());
            });
            // $http.get('data/address.json').success(function(response) {
            //     console.log(response.location);
            //     defer.resolve(response.location[cityId]);
            // });
            return defer.promise;
        },
        selectAllLocation: function() {
            var defer = $q.defer();
            var locationData = firebase.database().ref('location/');
            locationData.on('value', function(data) {
                console.log(data.val());
                defer.resolve(data.val());
            });
            // $http.get('data/address.json').success(function(response) {
            //     console.log(response.location);
            //     defer.resolve(response.location);
            // });
            return defer.promise;
        },
        selectBuilder: function() {
            var defer = $q.defer();
            var builderData = firebase.database().ref('builders/');
            builderData.on('value', function(data) {
                console.log(data.val());
                defer.resolve(data.val());
            });
            // $http.get('data/extras.json').success(function(response) {
            //     console.log(response.builders);
            //     defer.resolve(response.builders);
            // });
            return defer.promise;
        },
        selectProject: function() {
            var defer = $q.defer();
            var projectData = firebase.database().ref('projects/');
            projectData.on('value', function(data) {
                console.log(data.val());
                defer.resolve(data.val());
            });
            // $http.get('data/extras.json').success(function(response) {
            //     console.log(response.projects);
            //     defer.resolve(response.projects);
            // });
            return defer.promise;
        }
    };
    return obj;
});