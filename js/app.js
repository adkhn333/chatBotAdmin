// Initialize Firebase
var config = {
    apiKey: "AIzaSyDA3UmmLXoiGh4RgwWEbYkigv7wWtqFQW8",
    authDomain: "learningapp-ea02a.firebaseapp.com",
    databaseURL: "https://learningapp-ea02a.firebaseio.com",
    storageBucket: "learningapp-ea02a.appspot.com",
};
firebase.initializeApp(config);
var app = angular.module('chatApp',['ngMaterial','ngMdIcons', 'ui.router', 'ngStorage']);
app.controller('mainCtrl', function($scope, $timeout, $mdSidenav,$localStorage,$http) {
    $scope.chkId=0;
    $scope.name="Ajay";
    $scope.suggestions=[];
    $scope.statusId=1;
    $scope.curFlag=0;
    $scope.chat=[];
    $scope.users=[];
    var uid=-1;   // fill this id with the id from local storage of current chat user
    var aid=1234;

    // firebase.database().ref('/chats/'+uid).on("child_added",function(snapshot){
    //     $timeout(function(){
    //         $scope.chat.push(snapshot.val());
    //     },50);    
    // });

   

    $scope.saveChat=function(msg) {
        if(uid!=-1){
                var curTime=new Date().getTime();
                var key=firebase.database().ref('/chats/'+uid).push().key;
                var data =  {
                    id : aid,
                    msg : msg,
                    time:curTime
                }
                firebase.database().ref('/chats/'+uid+'/'+key).set(	
                data,function(val){
                    if(val!=null){
                        console.log(val.message);
                    }else{
                        console.log(aid +' : '+msg);
                        console.log('Success');

                    }
                });

                data['id']='';
                data['msg']=msg;
                data['operation']='buy';
                var fltr = $scope.filters;
                data['filters']={fltr};
                // console.log(data);
                // $http.get('http://192.168.1.45/api/chatbot',data)
                // .success(function(){
                //   console.log("Submitted data");
                // });

            $http({
            method: 'GET',
            url: 'http://192.168.1.45/api/chatbot',
            params: data
            })
            .then(function successCallback(response){
                console.log(response);
                $timeout(function(){
                    $scope.suggestions=response.data.suggestions;
                },500);
            }, function errorCallback(response){
                console.log(response);
            });

            // $scope.suggestions=["Hi how are you!","are feeling good?"];

            $scope.msg="";
        }else{
            console.log("Not allowed ... First Select a user to chat");
            $scope.msg="";
        }
    };
    $scope.loadFirstChat=function(id){
        var checkStat=0;
        angular.forEach($localStorage.ids,function(value,key){
            if(id==value){
                checkStat=1;
            }
        });
        if(uid!=-1 && checkStat!=1){

            $http({
            method: 'GET',
            url: 'http://192.168.1.45/api/generic_chat',
            params: {
                    msg:"",
                    operation : 'buy'
                }
            })
            .then(function successCallback(response){
                console.log(response);
                $timeout(function(){
                    $scope.suggestions=response.data.suggestions;
                },500);
            }, function errorCallback(response){
                console.log(response);
            });

             $scope.saveChat("How may I help you!");
         }
    }

    $scope.changeUser=function(index){
        $scope.curFlag=index+1;
        uid=$scope.users[index].id;
        $scope.chkId=uid;
        $scope.loadFirstChat(uid);
        $localStorage.ids.push(uid);
        $localStorage.ids;
        // console.log("Current Chatting user id is "+uid); 
        $scope.chat=[];
        firebase.database().ref('/chats/'+uid).on("child_added",function(snapshot){
            $timeout(function(){
                $scope.chat.push(snapshot.val());
                 var c=snapshot.val();
             console.log(c);
            },50);    
        });
    };


    $scope.deleteItem = function (index) {
        $scope.users.splice(index, 1);
    }


	$scope.users=[
		{
			"id":"1",
			"status":"1",
			"name":"Ajay"
		},

		{
			"id":"2",
			"status":"2",
			"name":"Vijay"
		},

		{
			"id":"3",
			"status":"2",
			"name":"Dhanajay"
		},

		{
			"id":"4",
			"status":"1",
			"name":"Sanjay"
		},

		{
			"id":"5",
			"status":"1",
			"name":"Raman"
		},

		{
			"id":"6",
			"status":"1",
			"name":"Aman"
		}


	];
	$scope.listings=[
		{
			"id":"1",
			"project":"xyz",
			"image":"http://blogs.intel.com/iot/files/2015/01/SmartBuilding.jpg",
			"address":" Sector-42 Gurgaon",
			"description":"2,3,5 BHK Available ",
			"price":"20-27 lacs"
		},

		{
			"id":"2",
			"project":"stark tower",
			"image":"http://www.asbbuildingcontractor.ae/images/building.png",
			"address":" Sector-43 Gurgaon",
			"description":"2,3 BHK Available ",
			"price":"400 Cr"
		},

		{
			"id":"3",
			"project":"hulk tower",
			"image":"http://www.teamprofessional.co.in/images/building.png",
			"address":" Sector-44 Gurgaon",
			"description":"1,2,3,4 BHK Available ",
			"price":"10 lacs"
		},

		{
			"id":"4",
			"project":"bean buddy Tower",
			"image":"http://pimg.tradeindia.com/02279179/b/2/extra-02279179.jpg",
			"address":" Sector-45 Gurgaon",
			"description":"1,2,3 BHK Available ",
			"price":"30 lacs"
		},

		{
			"id":"5",
			"project":"Death Star",
			"image":"http://blogs.intel.com/iot/files/2015/01/SmartBuilding.jpg",
			"address":" Sector-46 Gurgaon",
			"description":"1,2,3,4,5 BHK Available ",
			"price":"20-27 lacs"
		}
	];
    $scope.toggleRight = function() {
        console.log('clickedd');
        $mdSidenav('right')
        .toggle()
        .then(function() {
            console.log('clicked');
        });
    }
})
app.controller('filterCtrl', 
    function($scope, $rootScope, $http, $state, $localStorage, $mdSidenav, $timeout, Location) {	
    console.log($state.current.name.charAt(0).toUpperCase() + $state.current.name.slice(1));
    $rootScope.filterTitle = $state.current.name.charAt(2).toUpperCase() + $state.current.name.slice(3);
    // $rootScope.showHero = $location.path() === '/list' ? true: false;
    $scope.ratings = [1, 2, 3, 4, 5];
    $scope.ranges = [10, 20, 30, 40, 50];
    $scope.locationsTemp = [];
    $scope.loc = {};
    $scope.cities = [];
    $scope.locations = [];
    $scope.zones = [];
    // Dummy City ID
    var cityID = 'key1';
    $scope.filters = {};
    $scope.local = {};
    $scope.local.projectStatus = $localStorage.projectStatus;
    // $scope.filters.projectStatus = $localStorage.projectStatus;
    $scope.local.loc = $localStorage.loc;
    $scope.local.clubHouse = $localStorage.clubHouse;
    $scope.local.cost = $localStorage.cost;
    $scope.local.configurations = $localStorage.configurations;
    $scope.local.other = $localStorage.other;
    $scope.local.nearby = $localStorage.nearby;
    $scope.local.top = $localStorage.top;
    $scope.local.rating = $localStorage.rating;
    $scope.local.security = $localStorage.security;
    $scope.local.sportActivities = $localStorage.sportActivities;
    $scope.local.specifications = $localStorage.specifications;
    $scope.local.projectDetails = window.localStorage.projectDetails;

    $scope.properties = ['apartment', 'villa', 'rowHouse', 'studioApartment', 'servicedApartment'];

    function sanitizeObject(obj) {
        if(obj === null || obj === undefined) {
            console.log(obj);
            delete obj;
        }
        for(var i in obj) {
            console.log(i);
            if(obj[i] === null || obj[i] === undefined) {
                delete obj[i];
            }
            else {
                sanitizeObject(obj[i]);
            }
        }
        return Object.getOwnPropertyNames(obj).length === 0 ? undefined : obj;
    }

    $scope.clearForm = function(name, objName) {
        console.log(name);
        $scope[name].$setPristine();
        $scope[name].$setUntouched();
        $scope.filters[objName] = {};
    };

    // $http.get('data/data.json').success(function(response) {
    //     // $scope.locations = angular.fromJson(response.location[cityID]);
    //     // Must Convert JSON Object into Array Else It Will Give Error When Applying Filters On ng-repeat
    //     $scope.locationsTemp = [];
    //     angular.forEach(angular.fromJson(response.location[cityID]), function(data) {
    //         $scope.locationsTemp.push(data);
    //     });
    // });

    $scope.applyFilter = function(obj, name) {
        console.log(obj);
        // $localStorage[name] = obj[name];
        window.localStorage.setItem(name, obj);
        console.log(window.localStorage);
    }

    // $scope.fillZonesAndLocations = function(id) {
    //     $scope.filters.projectDetails.address.zone = null;
    //     $scope.filters.projectDetails.address.location = null;
    //     console.log()
    //     console.log(id);
    //     Location.selectZoneByCity(id).then(function(response) {
    //         console.log(response);
    //         $scope.zones = response;
    //     });
    //     if($scope.filters.projectDetails.address.location == null
    //        || $scope.filters.projectDetails.address.location == undefined ) {
    //         Location.selectLocationByCity(id).then(function(response) {
    //             console.log(response);
    //             $scope.locations = response;
    //         });
    //     }
        
    // }
    // $scope.fillLocations = function(cityId, zoneId) {
    //     console.log(cityId);
    //     console.log(zoneId);
    //     Location.selectLocationByZone(cityId, zoneId).then(function(response) {
    //         console.log(response);
    //         $scope.locations = response;
    //     });
    // }
    // function init() {
    //     if($scope.local.projectDetails.address.city != null
    //         || $scope.local.projectDetails.address.city != undefined) {
    //         Location.selectCity().then(function(response) {
    //             $scope.cities = response;
    //         });
    //         Location.selectZoneByCity($scope.local.projectDetails.address.city).then(function(response) {
    //             $scope.zones = response;
    //         });
    //         if($scope.local.projectDetails.address.zone != null
    //             || $scope.local.projectDetails.address.zone != undefined) {
    //               Location.selectLocationByZone($scope.local.projectDetails.address.city, $scope.local.projectDetails.address.zone).then(function(response) {
    //                 $scope.locations = response;
    //             });  
    //         }
    //         else {
    //             Location.selectLocationByCity($scope.local.projectDetails.address.city).then(function(response) {
    //                 console.log(response);
    //                 $scope.locations = response;
    //             });
    //         }
    //     }
    //     else {
    //         Location.selectCity().then(function(response) {
    //             $scope.cities = response;
    //         });
    //     }
    // }

    function fillZonesAndLocations(id) {

        Location.selectZoneByCity(id).then(function(response) {
            $scope.zones = [];
            angular.forEach(response, function(data) {
                $scope.zones.push(data);
            });
            // $scope.zones = temp;
        });
        Location.selectLocationByCity(id).then(function(response) {
            $scope.locations = [];
            angular.forEach(response, function(data) {
                $scope.locations.push(data);
            });
            // $scope.locations = temp;
        });
    }

    $scope.fillZonesAndLocations = function(id) {
        fillZonesAndLocations(id);
    }

    function init() {
        Location.selectCity().then(function(response) {
            $scope.cities = response;
        });
        if($scope.local.projectDetails != undefined &&$scope.local.projectDetails.address != undefined ) {
            if($scope.local.projectDetails.address.city != null 
                || $scope.local.projectDetails.address.city != undefined) {
                fillZonesAndLocations($scope.local.projectDetails.address.city)
            }
        }
    }
    init();
    
})
app.filter('camelCaseToHuman', function() {
    return function(input) {
        return input
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function(str){ return str.toUpperCase(); });
    }
})

;