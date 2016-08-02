// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyArqlA_cCJTxECIE_8wn5HacT3k1eHMYVQ",
//     authDomain: "chatapp-3110c.firebaseapp.com",
//     databaseURL: "https://chatapp-3110c.firebaseio.com",
//     storageBucket: "chatapp-3110c.appspot.com",
// };
// firebase.initializeApp(config);
var config = {
    apiKey: "AIzaSyAdggLm_P1I2wx7-5ECgzPLBPOPhsq2VTI",
    authDomain: "project-5218220492009865828.firebaseapp.com",
    databaseURL: "https://project-5218220492009865828.firebaseio.com",
    storageBucket: "project-5218220492009865828.appspot.com",
};
firebase.initializeApp(config);
var app = angular.module('chatApp',['ngMaterial','ngMdIcons', 'ui.router', 'ngStorage']);
app
.controller('mainCtrl', function($scope, $rootScope, $timeout, $mdSidenav, $localStorage, $http, Location) {

    var chkMin=60*60*1000;     //  can be 1 hour or 5 min time check for messages

    $scope.chkId=0;
    $scope.name="Ajay";
    $scope.suggestions=[];
    $scope.statusId=1;
    $scope.curFlag=0;
    $scope.chat=[];
    $scope.users=[];
    $scope.listings=[];
    $scope.projectIds=[];
    $localStorage.msgs=0;
    $scope.reply='';
     var c=[];
    var lastMsg;
    var uid=-1;   // fill this id with the id from local storage of current chat user
    var aid=1234;

    
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

               
                // console.log(data);
                // $http.get('http://192.168.1.45/api/chatbot',data)
                // .success(function(){
                //   console.log("Submitted data");
                // });


            // $scope.suggestions=["Hi how are you!","are feeling good?"];

            $scope.msg="";
        }else{
            console.log("Not allowed ... First Select a user to chat");
            $scope.msg="";
        }
    };
    $scope.sendToGeneric=function(msg){

        $http({
            method: 'GET',
            url: 'http://104.131.186.88/generic_chat',
            params: {
                    msg:msg,
                    operation : 'buy'
            }
        })
        .then(function successCallback(response){
            console.log(response);
            $timeout(function(){
                $scope.suggestions=[];
                $scope.suggestions.push(response.data.reply);
            },500);
        }, function errorCallback(response){
            console.log(response);
        });
    };
    $scope.loadFirstChat=function(id){
        var checkStat=0;
        angular.forEach($localStorage.ids,function(value,key){
            if(id==value){
                checkStat=1;
            }
        });
        if(uid!=-1 && checkStat!=1){
            $scope.sendToGeneric("");
            $scope.saveChat($scope.reply);
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
                var t=snapshot.val();
                if(t.id==uid && (new Date().getTime())-t.time < chkMin)
                    $scope.sendLastMsg();
            },50);    
        });

    };

    // firebase.database().ref('/chats/'+uid).on("child_added",function(snapshot){
    //     $timeout(function(){
    //         $scope.chat.push(snapshot.val());
    //         var t=snapshot.val();

    //         if(t.id==uid )
    //             $scope.sendLastMsg();
    //     },50);    
    // });
    $scope.sendLastMsg=function(){
        firebase.database().ref('/chats/'+uid).orderByChild('id').endAt(10).limitToLast(1).once("value",function(snapshot){
            $timeout(function(){
               c=snapshot.val();
                angular.forEach(c, function(value, key) {
                    $scope.sendToGeneric(value.msg);
                    $scope.sendToApi(value.msg)
                });
            },50);    
        });
    };
   
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
	// $scope.listings=[
	// 	{
	// 		"id":"1",
	// 		"project":"xyz",
	// 		"image":"http://blogs.intel.com/iot/files/2015/01/SmartBuilding.jpg",
	// 		"address":" Sector-42 Gurgaon",
	// 		"description":"2,3,5 BHK Available ",
	// 		"price":"20-27 lacs"
	// 	},

	// 	{
	// 		"id":"2",
	// 		"project":"stark tower",
	// 		"image":"http://www.asbbuildingcontractor.ae/images/building.png",
	// 		"address":" Sector-43 Gurgaon",
	// 		"description":"2,3 BHK Available ",
	// 		"price":"400 Cr"
	// 	},

	// 	{
	// 		"id":"3",
	// 		"project":"hulk tower",
	// 		"image":"http://www.teamprofessional.co.in/images/building.png",
	// 		"address":" Sector-44 Gurgaon",
	// 		"description":"1,2,3,4 BHK Available ",
	// 		"price":"10 lacs"
	// 	},

	// 	{
	// 		"id":"4",
	// 		"project":"bean buddy Tower",
	// 		"image":"http://pimg.tradeindia.com/02279179/b/2/extra-02279179.jpg",
	// 		"address":" Sector-45 Gurgaon",
	// 		"description":"1,2,3 BHK Available ",
	// 		"price":"30 lacs"
	// 	},

	// 	{
	// 		"id":"5",
	// 		"project":"Death Star",
	// 		"image":"http://blogs.intel.com/iot/files/2015/01/SmartBuilding.jpg",
	// 		"address":" Sector-46 Gurgaon",
	// 		"description":"1,2,3,4,5 BHK Available ",
	// 		"price":"20-27 lacs"
	// 	}
	// ];

    // Adnan Code

    $scope.toggleRight = function() {
        console.log('clickedd');
        $mdSidenav('right')
        .toggle()
        .then(function() {
            console.log('clicked');
        });
    }
    // Initially Loads City And Location Details
    function init() {
        console.log('init');
        Location.selectCity().then(function(response) {
            $rootScope.cities = response;
        });
        // if($scope.local.projectDetails != undefined && $scope.local.projectDetails.address != undefined ) {
        //     if($scope.local.projectDetails.address.city != null 
        //         || $scope.local.projectDetails.address.city != undefined) {
        //         fillLocations($scope.local.projectDetails.address.city);
        //     }
        // }
        Location.selectAllLocation().then(function(response) {
            // angular.forEach(response, function(obj) {
            //     console.log(obj);
            //     angular.forEach(obj, function(data) {
            //         $scope.locations.push(data);
            //     });
            // });
            $rootScope.locations = response;
            console.log($scope.locations);
        });
        Location.selectProject().then(function(response) {
            // angular.forEach(response, function(obj) {
            //     $scope.projects.push(obj);
            // });
            $rootScope.projects = response;

        });
        Location.selectBuilder().then(function(response) {
            // angular.forEach(response, function(obj) {
            //     $scope.builders.push(obj);
            // });
            $rootScope.builders = response;
        });
    }
    init();
})
.controller('filterCtrl', 
    function($scope, $rootScope, $http, $state, $localStorage, $timeout, Location) {	
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
    $scope.$storage = $localStorage;
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
    $scope.local.projectDetails = angular.copy($localStorage.projectDetails);

    $scope.cities = $rootScope.cities;
    $scope.locations = $rootScope.locations;
    $scope.projects = $rootScope.projects;
    $scope.builders = $rootScope.builders;

    $scope.properties = ['apartment', 'villa', 'rowHouse', 'studioApartment', 'servicedApartment'];
    // $scope.projects = [
    //     {projectId: 'pID1', projectName: 'Project 1'},
    //     {projectId: 'pID2', projectName: 'Project 2'},
    //     {projectId: 'pID3', projectName: 'Project 3'},
    //     {projectId: 'pID4', projectName: 'Project 4'},
    //     {projectId: 'pID5', projectName: 'Project 5'}
    // ];
    // $scope.builders = [
    //     {builderId: 'bID1', builderName: 'Builder 1'},
    //     {builderId: 'bID2', builderName: 'Builder 2'},
    //     {builderId: 'bID3', builderName: 'Builder 3'},
    //     {builderId: 'bID4', builderName: 'Builder 4'},
    //     {builderId: 'bID5', builderName: 'Builder 5'}
    // ];

    // Deprecated API
    // function to remove undefined and null key value pairs from object
    // function sanitizeObject(obj) {
    //     if(obj === null || obj === undefined) {
    //         console.log(obj);
    //         delete obj;
    //     }
    //     for(var i in obj) {
    //         console.log(i);
    //         if(obj[i] === null || obj[i] === undefined) {
    //             delete obj[i];
    //         }
    //         else {
    //             sanitizeObject(obj[i]);
    //         }
    //     }
    //     return Object.getOwnPropertyNames(obj).length === 0 ? undefined : obj;
    // }


    // function to clear form with the name 'name' and also the scope object on that form with name 'objectName'
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

    // $scope.$watch('filters.projectDetails.address.city', function(newValue, oldValue) {
    //     console.log(newValue);
    //     console.log(oldValue);
    //     var temp = {};
    //     if(newValue != undefined && oldValue != undefined) {
    //         temp[oldValue] = $scope.filters.projectDetails.address.location;
    //         console.log(temp);
    //         $scope.filters.projectDetails.address.location = [];
    //     }
    // });

    // Stores Filters in local storage
    $scope.applyFilter = function(obj, name) {
        console.log(obj);
        // Fix for Address Field in project details page
        // This is to remove previous saved locations from localstorage to remove duplicacy
        // if(name === 'projectDetails') {
        //     if($localStorage.projectDetails != undefined) {
        //         if($scope.filters.projectDetails.address != null || $scope.filters.projectDetails.address != undefined) {
        //             if($scope.filters.projectDetails.address.city != $localStorage.projectDetails.address.city) {
        //                 console.log('hit3');
        //                 $localStorage['projectDetails']['address']['location'] = null;
        //                 console.log($localStorage);
        //             }
        //         }
        //     }
        // }
        $localStorage[name] = angular.copy(obj[name]);
        syncValue();
        console.log($localStorage);
        sendToApi();
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

    // function fillLocations() {
        // $scope.locations = [];
        // Location.selectLocationByCity(id).then(function(response) {
        //     angular.forEach(response, function(data) {
        //         $scope.locations.push(data);
        //     });
        // });
        // $scope.filters.projectDetails = $localStorage.projectDetails;
        
    // }
    // $scope.fillLocations = function(id) {
    //     fillLocations(id);
    // }

    // Sync Values from local storage
    function syncValue() {
        $scope.local.projectDetails = angular.copy($localStorage.projectDetails);
        $scope.filters.projectDetails = angular.copy($scope.local.projectDetails);
    }

    $scope.syncValue = function() {
        syncValue();
    }
    
    function sendToApi(){
        var data = {};
        // data['id'] = id;
        // data['msg'] = msg;
        // data['operation'] = 'buy';
        // console.log($scope.filters);
        // var fltr = $scope.filters;
        // console.log(fltr);
        // data['filters'] = {fltr};
        var data = {
            id: '2gFncPpginVNOnc9nCpUnw7qoej1',
            msg: 'asd',
            operation: 'buy',
            filters: $scope.filters
        };
        console.log(data);
        $http({
            method: 'GET',
            url: 'http://104.131.186.88/chatbot',
            params: data
        })
        .then(function successCallback(response){
            console.log(response);
            $scope.filters = response.data.filters;
            $scope.listings=[];
            $timeout(function(){
                //getting project informations
                angular.forEach(response.data.projects,function(value,key){
                    firebase.database().ref('/protectedResidential/9999/projects/'+value).once('value',function(snapshot){
                        // console.log(snapshot.val());
                        var pT=snapshot.val();
                        angular.forEach(snapshot.val().units,function(value,key){
                            var desc=value.configurations.propertyType;
                            var price=value.configurations.price;
                        });

                        //creating temporary project object
                        var t = {
                            "id":value,
                            "project":pT.projectDetails.projectName,
                            "image":"http://blogs.intel.com/iot/files/2015/01/SmartBuilding.jpg",
                            "address":pT.projectDetails.address.addressLine1+pT.projectDetails.address.addressLine2,
                            "description":desc,
                            "price": price
                        }
                        $timeout(function(){
                            //pushing that object to listings 
                            $rootScope.listings.push(t);
                        },50);
                    });
                });
                //getting suggestions
                angular.forEach(response.data.suggestions,function(value,key){
                    $scope.suggestions.push(value);
                });
                //getting filters
                // $scope.filters=response.data.filters;
            },500);
        }, function errorCallback(response){
            console.log(response);
        });
    };
})

//Filter to change camel case keys from database into human readable text
.filter('camelCaseToHuman', function() {
    return function(input) {
        return input
            // insert a space in place of a '-'
            .replace(/-/g, ' ')
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function(str){ return str.toUpperCase(); });
    }
})

.filter('customFilter', function() {
    return function(input, search, field) {
        if (!input) return input;
        if (!search) return input;
        var expected = ('' + search).toLowerCase();
        var result = {};
        angular.forEach(input, function(value, key) {
            var actual = ('' + value[field]).toLowerCase();
            if (actual.indexOf(expected) != -1) {
                result[key] = value;
            }
        });
        return result;
    }
})

;